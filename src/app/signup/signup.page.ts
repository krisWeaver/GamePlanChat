import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import firebase from 'firebase'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(public navCtrl: NavController, public toastContrl: ToastController, public alertController: AlertController) {

  }

  name: string = "";
  email: string = "";
  password: string = "";
  teamName: string = "";

  signUp() {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    .then((data)=>{

      
      let newUser: firebase.User = data.user;

      
      newUser.updateProfile({
        displayName: this.name,
        photoURL: "",
      }).then(() => {
        this.presentSignupSuccessAlert(newUser.displayName); 
      })
      


    }).catch((err) => {
      console.log(err.message);
      this.presentErrorAlert(err.message); 
    })
  }

 

  async presentSignupSuccessAlert(user) {
    const alert = await this.alertController.create({
      header: 'Welcome',
      message: 'Congrats ' + user + ' you have successfully signed up!',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.navigateRoot('feed',{replaceUrl: true}); 
        }
      }]
    });

    await alert.present();
  }

  

  async presentErrorAlert(error) {
    const alert = await this.alertController.create({
      header: 'Uh Oh',
      message: error,
      buttons: ['Ok']
    });

    await alert.present();

  }
  

  ngOnInit() {
  }

}
