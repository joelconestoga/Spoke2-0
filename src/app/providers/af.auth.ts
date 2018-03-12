import { AngularFireAuth } from "angularfire2/auth";
import { Injectable } from "@angular/core";
import { Auth } from "./i.auth";
import * as firebase from 'firebase/app';

@Injectable()
export class AFAuth implements Auth {

  constructor(private af: AngularFireAuth) {}

  checkUserSession(callbackLoggedIn, callbackNotLogged) {
    this.af.authState.subscribe((auth) => {
      if(auth == null) {
        callbackNotLogged(auth);
      }
      else {
        callbackLoggedIn(auth);
      }
    });
  }

  loginWithGoogle(callback) {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      function(result) {
        callback(result);
      }
    );
  }
     
}