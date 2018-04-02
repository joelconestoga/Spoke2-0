import { AngularFireAuth } from "angularfire2/auth";
import { Injectable } from "@angular/core";
import { IAuth } from "./i.auth";
import * as firebase from 'firebase/app';

@Injectable()
export class Auth implements IAuth {

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
     
  loginWithFacebook(callback) {
    this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
      function(result) {
        callback(result);
      }
    );
  }
     
  logout(callback) {
    this.af.auth.signOut().then(
      function(result) {
        callback(result);
      }
    );
  }
   
  registerUser(email, password, callback) {
    var self = this;
    return this.af.auth.createUserWithEmailAndPassword(email, password).then(
      function(user) {
        callback(user);
      }
    );
  }

  loginWithEmail(email, password, callback) {
    this.af.auth.signInWithEmailAndPassword(email, password).then(
      function(user) {
        callback(user);
      }
    );
  }
  
}