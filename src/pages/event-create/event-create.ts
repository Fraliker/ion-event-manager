import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';

/**
 * Generated class for the EventCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
	name: 'event-create'
})
@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html',
})
export class EventCreatePage {

  constructor(public navCtrl: NavController, public eventProvider: EventProvider, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventCreatePage');
  }

	createEvent(eventName: string, eventDate: string, eventPrice: number, eventCost: number) {
		this.eventProvider.createEvent(eventName, eventDate, eventPrice, eventCost)
			.then( newEvent => {
				this.navCtrl.pop();
		});
	}

	goToEventDetail(eventId){
		this.navCtrl.push('event-detail', {'eventId': eventId});
	}
	
}
