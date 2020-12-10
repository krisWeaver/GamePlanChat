import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Camera } from '@ionic-native/camera/ngx';


//import { Firebase } from '@ionic-native/firebase/ngx'; 
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDFfH5eReJW_d6wk9KHzCDbpwK3ppGx670",
  authDomain: "gameplanchat-f5edc.firebaseapp.com",
  databaseURL: "https://gameplanchat-f5edc.firebaseio.com",
  projectId: "gameplanchat-f5edc",
  storageBucket: "gameplanchat-f5edc.appspot.com",
  messagingSenderId: "149255908589",
  appId: "1:149255908589:web:4c679242911f71ad3170e4",
  measurementId: "G-C5R1SPEF6Y"
};

firebase.initializeApp(firebaseConfig);
/*
firebase.firestore().settings({
  timestampsInSnapshots: true
})
*/

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
