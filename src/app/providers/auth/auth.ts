import { AngularFireAuth } from "angularfire2/auth";
import { Injectable } from "@angular/core";
import { IAuth } from "./i.auth";
import * as firebase from 'firebase/app';

/**
 * This class is responsible for authentication. It is a wrapper class for the third party library AngularFireAuth.
 */
@Injectable()
export class Auth implements IAuth {

  constructor(private af: AngularFireAuth) {}

  /**
   * 
   * @param callbackLoggedIn This method will be called if there is a user logged in.
   * @param callbackNotLogged This method will be called if no user is logged in.
   */
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

  /**
   * Calls authentication with Google account.
   * @param callback This method will be called when the user is logged in.
   */
  loginWithGoogle(callback) {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      function(result) {
        callback(result);
      }
    );
  }
  
  /**
   * Calls authentication with Facebook account.
   * @param callback This method will be called when the authentication is validated.
   */
  loginWithFacebook(callback) {
    this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
      function(result) {
        callback(result);
      }
    );
  }
  
  /**
   * Calls the current Authentication to logout the current user.
   * @param callback This method will be called back when the user is logged out.
   */
  logout(callback) {
    this.af.auth.signOut().then(
      function(result) {
        callback(result);
      }
    );
  }
  
  /**
   * Creates a new user on Firebase.
   * @param email 
   * @param password 
   * @param callback Method to be called when the registration succeeds.
   */
  registerUser(email, password, callback) {
    var self = this;
    return this.af.auth.createUserWithEmailAndPassword(email, password).then(
      function(user) {
        callback(user);
      }
    );
  }

  /**
   * Calls authentication with email and password.
   * @param email 
   * @param password 
   * @param callback Method to be called when the login succeeds.
   */
  loginWithEmail(email, password, callback) {
    this.af.auth.signInWithEmailAndPassword(email, password).then(
      function(user) {
        callback(user);
      }
    );
  }
  
}