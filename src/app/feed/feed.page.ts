import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ActionSheetController, AlertController, IonInfiniteScroll } from '@ionic/angular';
import firebase from 'firebase';
import moment from 'moment'; 

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  providers: [NavParams]
})
export class FeedPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  text:string = "";
  posts: any[] = [];
  pageSize: number = 10; 
  cursor: any; 
  infiniteEvent: any;

  constructor (public navCtrl: NavController, public navParams: NavParams, 
    public loadingCtrl: LoadingController, private toastCtrl: ToastController, 
    private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController) {

    this.getPosts();

  }

  getPosts() {

    this.posts = [];
    
    this.loading();

    let query = firebase.firestore().collection("posts").orderBy("created", "desc").limit(this.pageSize);

    /* 
    query.onSnapshot((snapshot)=>{
      let changedDocs = snapshot.docChanges();
      
      changedDocs.forEach((change)=>{

        if (change.type == 'added'){

        }

        if (change.type == 'modified'){

        }

        if (change.type == 'removed'){

        }

      })
      
    })
    */ 
 
    query.get()
    .then((docs)=>{
      docs.forEach((doc)=>{
        this.posts.push(doc); 
      })

      this.loadingCtrl.dismiss(); 

      this.cursor = this.posts[this.posts.length - 1];

    }).catch((err)=>{
      console.log(err); 
    })
  }

  post() {

    firebase.firestore().collection("posts").add({
      text: this.text,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      owner: firebase.auth().currentUser.uid,
      owner_name: firebase.auth().currentUser.displayName
    }).then((doc)=> {
      console.log(doc)
      this.text = ""; 
      this.getPosts(); 
    }).catch((err)=>{
      console.log(err); 
    })

  }


  loadMorePosts(event){

    firebase.firestore().collection("posts").orderBy("created", "desc")
    .startAfter(this.cursor).limit(this.pageSize).get()
    .then((docs)=>{
      docs.forEach((doc)=>{
        this.posts.push(doc); 
      })

      // All posts have been loaded when hitting this code block 
      if (docs.size < this.pageSize){
        event.target.disabled = true; 
        this.infiniteEvent = event; 
      } else {
        event.target.complete(); 
        this.cursor = this.posts[this.posts.length - 1]; 
      }
    }).catch((err)=>{
      console.log(err); 
    })

  }

  refresh(event){

    console.log('Begin async operations', event);
    this.posts = []; 
    this.getPosts();

    if (this.infiniteEvent) {
      this.infiniteEvent.enable(true);
    }
     
    event.target.complete();

    setTimeout(() => {
      console.group('Async operation has ended'); 
      event.target.complete();
    }, 2000);
    
  }

  ago(time){
    let difference = moment(time).diff(moment());
    return moment.duration(difference).humanize(); 
  }

  logout(){
    firebase.auth().signOut().then(()=>{
      this.successfulLogout(); 
      this.navCtrl.navigateRoot('home',{replaceUrl: true}); 
    })
  }

  /*
  comment(post){
    this.actionSheetCtrl.create({
      buttons: [
        {
          text: "View All Comments",
          handler: ()=> {}
        },
        {
          text: "Leave A Comment",
          handler: ()=> {
            this.alertCtrl.create({
              header: "New Comment",
              message: "Type your comment",
              inputs: [
                {
                  name:"comment",
                  type:"text"
                }
              ],
              buttons: [
                {
                  text: "Cancle"
                },
                {
                  text: "Post",
                  handler: (data)=> {
                    if (data.comment){
                      firebase.firestore().collection("comments").add({
                        text: data.comment,
                        post: post.id,
                        owner: firebase.auth().currentUser.uid,
                        owner_name: firebase.auth().currentUser.displayName,
                        created: firebase.firestore.FieldValue.serverTimestamp()
                      }).then((doc)=>{
                        this.successfulComment(); 
                      }).catch((err)=>{
                        this.failedComment(); 
                      })
                    }
                  }
                }
              ]
            })
          }
        }
      ]
    });
  }

*/

  // Async Functions 

  async loading() {
    let loading = await this.loadingCtrl.create({
      message: "Loading feed..."
    }) 

    await loading.present(); 
  }

  async successfulPost() {
    const alert = await this.toastCtrl.create({
      header: 'Success',
      message: 'You have successfully posted!',
      duration: 2000
    });

    await alert.present();
  }

  async successfulLogout(){
    const alert = await this.toastCtrl.create({
      header: 'Successful Logout',
      message: 'You have been logged out!',
      duration: 2000
    });

    await alert.present(); 
  }

  async successfulComment(){
    const alert = await this.toastCtrl.create({
      message: "Comment created successfully",
      duration: 2000
    });

    await alert.present(); 
  }

  async failedComment() {
    const alert = await this.toastCtrl.create({
      message: "Failed to post comment",
      duration: 2000
    });

    await alert.present(); 
  }

  ngOnInit() {
  }

}
