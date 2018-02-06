import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';

import { TabsPage } from '../pages/tabs/tabs';
// var FCMPlugin:any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private fcm: FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if(typeof(this.fcm) !== "undefined"){

        this.fcm.getToken().then(token=>{
          console.log(token);
          // backend.registerToken(token);
        })

        if (this.fcm.subscribeToTopic('all')){
            console.log("subscribed to topic ALL");
        }else{
          console.log("failed");
        }

        this.fcm.onNotification().subscribe(data=>{
          if(data.wasTapped){
            console.log("Received in background");
            console.log(JSON.stringify(data));
            alert("message recieved background:"+JSON.stringify(data.body));
          } else {
            console.log("Received in foreground");
            console.log(JSON.stringify(data));
            alert("message recieved foreground: "+data);
          };
        })

        fcm.onTokenRefresh().subscribe(token=>{
          console.log(token);
        })

      } else alert("Notifications disabled, only provided in Android/iOS environment");
      });
  }
}
