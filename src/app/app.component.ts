import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //initialize firebase. let the app talk to firebase server
      firebase.initializeApp({
				apiKey: "AIzaSyAJNQjCz7rMiR35_2tTdfYX9dLq2WHq9UA",
		    authDomain: "my-event-manager-ec0dd.firebaseapp.com",
		    databaseURL: "https://my-event-manager-ec0dd.firebaseio.com",
		    projectId: "my-event-manager-ec0dd",
		    storageBucket: "my-event-manager-ec0dd.appspot.com",
		    messagingSenderId: "833344966760"
			});

      //authentication listener for observing authentication state changes
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
				if (!user) {
				this.rootPage = 'login';
				unsubscribe();
				} else {
				this.rootPage = HomePage;
				unsubscribe();
				}
			});
    });
  }
}

