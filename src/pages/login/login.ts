import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthenticationService } from '../../core/AuthenticationService';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public authenticationService: AuthenticationService) {
  }

  googleLogin(){
    this.authenticationService.signInWithGoogle();

  }

  noLogin(){
    this.navCtrl.setRoot(HomePage,"HomePage");
  }

}
