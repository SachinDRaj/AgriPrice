import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { LoginPage } from '../login/login';
import { FCM } from '@ionic-native/fcm';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthenticationService } from '../../core/AuthenticationService';
import { HomePage } from '../home/home';
// import { NotificationsPage } from 'notifications/notifications';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  posts: any;
  dailycrops = [];
  item1: any;
  items: any;
  key: any;

  constructor(public navCtrl: NavController,public http: HTTP,public fcm: FCM,public afDB: AngularFireDatabase,public authenticationService: AuthenticationService) {
    if (this.authenticationService.getUserId()==null){
      this.navCtrl.setRoot(LoginPage);
    }

    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/recent', {}, {})
    .then(data => {
      this.posts = JSON.parse(data.data);
      this.dailycrops = this.posts;
    })
    .catch(error => {
      this.posts="Error using http.get";
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
  }


  subscribeToTopic(e: any,crop){
    var newcrop = crop.commodity.replace(/[^a-zA-Z ]/g,'').replace(/ /g,'');
    if (e.checked){
      if (this.key==null){
        this.key = this.authenticationService.getUserId();
        // this.afDB.list("users/"+this.key).push(this.key);
      }
      this.afDB.list("users/"+this.key+"/"+newcrop).push(newcrop);
      // this.fcm.subscribeToTopic(newcrop);//converts commodity to word without spaces and non-alphanumeric characters
      alert("Subscibed to commodity: "+crop.commodity);
    }else{
      // this.fcm.unsubscribeFromTopic(newcrop);
      alert("Unsubscibed to commodity:" + crop.commodity);
      this.afDB.list("users/"+this.key).remove(newcrop);
    }
  }

  OpenLoginPage(){
    this.navCtrl.push(LoginPage);
  }

  logOut(){
    this.authenticationService.signOut();
    this.navCtrl.setRoot(HomePage);
  }

}
