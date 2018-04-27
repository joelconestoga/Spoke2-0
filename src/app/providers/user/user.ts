
import { Injectable, Inject } from "@angular/core";
import { IAuth } from "../auth/i.auth";
import { IDatabase } from "../database/i.database";
import { IUser } from "./i.user";

/**
 * This class is reponsible for all operations related to the User (Registration, Authentication, Persistence).
 */
@Injectable()
export class User implements IUser {

  /** @hidden*/
  public displayName: string;
  /** @hidden*/
  public email: string;

  /** @hidden*/
  public userUid: string;
  /** @hidden*/
  public _isLoggedIn: boolean;

  /** @hidden*/
  public auth: IAuth;
  /** @hidden*/
  public database: IDatabase;

  /** @hidden*/
  public shouldCallThisBack;

  constructor(@Inject('Auth') auth: IAuth, 
              @Inject('Database') database: IDatabase) {
    
    this.auth = auth;
    this.database = database;
    
    this.userUid = "";
  }

  /** Retrieves the Auth service. */
  getAuth() {
    return this.auth;
  }

  /** Retrieves the Database service. */
  getDatabase() {
    return this.database;
  }

  /** Checks if there's a current session for any User. */
  checkUserSession(callback) {
    var self = this;

    var callbackLoggedIn = function(auth) {
      console.log("Successfully Logged in.");
      // console.log(auth);
      self.displayName = auth.displayName;
      self.email = auth.email;
      self.userUid = auth.uid;          
      self._isLoggedIn = true;
      callback(self._isLoggedIn, self.email);
    }

    var callbackNotLogged = function(auth) {
      console.log("Not Logged in.");
      self._isLoggedIn = false;
      callback(self._isLoggedIn, self.email);
    }

    this.getAuth().checkUserSession(callbackLoggedIn, callbackNotLogged);
  }

  /** Calls the Auth service to log in with Google account. If succeeds, save the user's details on Firebase. */
  loginWithGoogle(callback) {
    var self = this;
    
    var myCallback = function(result) {
      self.userUid = result.user.uid;
      self.saveUserInfoFromOAuth(result.user.uid, 
                                // result.additionalUserInfo.profile.given_name,
                                // result.additionalUserInfo.profile.family_name,
                                result.user.displayName,
                                result.user.email,
                                result.additionalUserInfo.providerId);
    }
    
    this.getAuth().loginWithGoogle(myCallback);
    
    if (callback) {
      callback(self._isLoggedIn);
    }
  }
  
  /** Calls the Auth service to log in with Facebook account. If succeeds, save the user's details on Firebase.*/
  loginWithFacebook(callback) {
    var self = this;

    var myCallback = function(result) {
      self.userUid = result.user.uid;
      self.saveUserInfoFromOAuth(result.user.uid, 
                                // result.additionalUserInfo.profile.given_name,
                                // result.additionalUserInfo.profile.family_name,
                                result.user.displayName,
                                result.user.email,
                                result.additionalUserInfo.providerId);
    }

    this.getAuth().loginWithFacebook(myCallback);
    
    if (callback) {
      callback(self._isLoggedIn);
    }
  }

  /** Calls the Auth service to log out of the current session. */
  logout(callback) {
    var self = this;

    var myCallback = function(result) {
      self.userUid = "";      
    }

    this.getAuth().logout(myCallback);

    callback();
  }

  /** Set a post as Favourite on Firebase. */
  setFavorite(post, callback) {
    this.getDatabase().setFavorite(this.userUid, post, callback);
  }

  /** Remove a post from Favourite on Firebase. */
  removeFromFavorites(id, callback) {
    this.getDatabase().removeFromFavorites(this.userUid, id, callback);
  }

  /** Checks if a post is Favourite on Firebase. */
  isFavorite(id, callback) {
    this.getDatabase().isFavorite(this.userUid, id, callback);
  }

  /** Retrieve all persisted Posts ids which are the user's Favourite from Firebase. */
  getFavoritesKeys(callback) {
    this.getDatabase().getFavoritesKeys(this.userUid, callback);
  }

  registerUser(email, password, callback) {
    var self = this;
    self.shouldCallThisBack = callback;

    var myCallback = function(user) {
      self.userUid = user.uid;
      self.shouldCallThisBack(user);
    }

    this.getAuth().registerUser(email, password, myCallback);
  }

  /** Calls the Database service to save the user details from Registration Form on Firebase. */
  saveUserInfoFromForm(uid, firstName, lastName, email, program, campus, callback) {
    var self = this;
    this.getDatabase().saveUserInfoFromForm(uid, firstName, lastName, email, program, campus, callback);
  }

  /** Calls the Database service to save the user details from OAuth(Google/Facebook) on Firebase. */
  saveUserInfoFromOAuth(uid, displayName, email, provider) {
    this.getDatabase().saveUserInfoFromOAuth(uid, displayName, email, provider);
  }

  /** Calls the Auth service to initiate a new session for the current user. */
  loginWithEmail(email, password, callback) {
    var self = this;
    this.shouldCallThisBack = callback;

    var myCallback = function(user) {
      self.userUid = user.uid;
      self.shouldCallThisBack(user);
    }

    this.getAuth().loginWithEmail(email, password, myCallback);
  }

  /** Checks if there's a user logged in. */
  isLoggedIn() {
    return this._isLoggedIn;
  }
}

