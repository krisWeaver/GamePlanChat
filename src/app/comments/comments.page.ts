import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController} from '@ionic/angular';
import firebase from 'firebase'; 
import moment from 'moment'; 

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  post: any = {}; 
  comments: any[] = [];

  constructor( public navCntrl: NavController, public navParams: NavParams, public modalCntrl: ModalController) { 

    this.post = this.navParams.get('post'); 
    
    firebase.firestore().collection('comments').where('post', '==', this.post.id).orderBy("created", "asc").get()
    .then((data) => {
      this.comments = data.docs;
    }).catch((err) => {
      console.log(err); 
    })
  }

  ago(time){
    let difference = moment(time).diff(moment());
    return moment.duration(difference).humanize(); 
  }

  close() {
    this.modalCntrl.dismiss(); 
  }

  ngOnInit() {
  }

}
