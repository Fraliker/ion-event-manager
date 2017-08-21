import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

	public fireAuth:firebase.auth.Auth; //holds authentication object
	public userProfileRef:firebase.database.Reference; //points to the firebase db /userProfile node

  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');
    this.fireAuth = firebase.auth();
    this.userProfileRef = firebase.database().ref('/userProfile');
  }

  //login function
  loginUser(email: string, password: string): firebase.Promise<any>{
  	return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  //signup function
  signupUser(email: string, password: string): firebase.Promise<any> {
		return this.fireAuth.createUserWithEmailAndPassword(email, password)
		.then( newUser => {
			this.userProfileRef.child(newUser.uid).set({
				email: email
			});
		});
	}

	//reset password function
	resetPassword(email: string): firebase.Promise<void> {
		return this.fireAuth.sendPasswordResetEmail(email);
	}

	//logout function
	logoutUser(): firebase.Promise<void> {
		this.userProfileRef.child(this.fireAuth.currentUser.uid).off();
		return this.fireAuth.signOut();
	}

}
