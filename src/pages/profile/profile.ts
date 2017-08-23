import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ProfileProvider } from '../../providers/profile/profile';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
	name: 'profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

	public userProfile: any;
	public birthDate: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public authProvider: AuthProvider, 
  	public profileProvider: ProfileProvider, public navParams: NavParams) {
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewDidEnter(){
		this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
			this.userProfile = userProfileSnapshot.val();
			this.birthDate = userProfileSnapshot.val().birthDate;
		});
  }

	//logout function
	logOut(): void {
		this.authProvider.logoutUser().then(() => {
			this.navCtrl.setRoot('login');
		});
	}

	//function to update user's first and last name
	updateName(){
		const alert = this.alertCtrl.create({
			message: 	"Your first name and last name",
			inputs: [
				{ 
					name: 'firstName',
					placeholder: 'Your first name',
					value: this.userProfile.firstName
				},
				{
					name: 'lastName',
					placeholder: 'Your last name',
					value: this.userProfile.lastName;
				},
			],
			buttons: [
				{
					text: 'Cancel'
				},
				{
					text: 'Save',
					handler: data => {
						this.profileProvider.updateName(data.firstName, data.lastName);
					}
				}
			]
		});
		alert.present();
	}

	//function to update birthdate
	updateDOB(birthDate){
		this.profileProvider.updateDOB(birthDate);
	}

	//function to update user's email
	updateEmail(){
		const alert = this.alertCtrl.create({
			message: 	"Your first name and last name",
			inputs: [
				{ 
					name: 'newEmail',
					placeholder: 'Your new email address',
				},
				{
					name: 'password',
					placeholder: 'Your password',
					type: 'password'
				},
			],
			buttons: [
				{
					text: 'Cancel'
				},
				{
					text: 'Save',
					handler: data => {
						const newEmail = data.newEmail;

						this.profileProvider.updateEmail(data.newEmail, data.password)
							.then( () => {
								this.userProfile.email = newEmail;
							}).catch(error => {
								console.log('ERROR: ' + error.message);
							});
					}
				}
			]
		});
		alert.present();
	}

	//function to update user's password
	updatePassword(){
		const alert = this.alertCtrl.create({
			inputs: [
				{ 
					name: 'newPassword',
					placeholder: 'Your new password',
					type: 'password'
				},
				{
					name: 'oldPassword',
					placeholder: 'Your old password',
					type: 'password'
				},
			],
			buttons: [
				{
					text: 'Cancel'
				},
				{
					text: 'Save',
					handler: data => {
						const newPassword = data.newPassword;

						this.profileProvider.updateEmail(data.newPassword, data.oldPassword)
							.then( () => {
								this.userProfile.password = newPassword;
							}).catch(error => {
								console.log('ERROR: ' + error.message);
							});
					}
				}
			]
		});
		alert.present();
	}
	
}
