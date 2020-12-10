import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
//import { SignupPage } from '../signup/signup.page';
//import { LostPassword } from '../lost-password/lost-password.page';
import firebase from 'firebase'; 
import { FeedPage } from '../feed/feed.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(public navCtrl: NavController, public toastContrl: ToastController, public alertController: AlertController) {

  }

  email: string = '';
  password: string = '';


  gotoSignup() {
    this.navCtrl.navigateForward('signup');
  }

  gotoLostPassword() {
    this.navCtrl.navigateForward('lost-password');
  }

  login(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    .then((user) =>{     
      //this.presentWelcomeAlert(user.user.displayName); 

      this.navCtrl.navigateRoot('feed',{replaceUrl: true}); 

    }).catch((err)=>{
      console.log(err.message); 

      this.presentErrorAlert(err.message); 
    })
  }

  async presentWelcomeAlert(user) {
    const alert = await this.alertController.create({
      header: 'Welcome',
      message: user,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.navigateRoot('feed', {replaceUrl: true}); 
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

}
