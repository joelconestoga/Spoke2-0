
import { Injectable, Inject } from "@angular/core";
import { IAuth } from "../auth/i.auth";
import { IDatabase } from "../database/i.database";
import { IUser } from "./i.user";


@Injectable()
export class User implements IUser {

  public displayName: string;
  public email: string;

  public userUid: string;
  public _isLoggedIn: boolean;

  public auth: IAuth;
  public database: IDatabase;

  public shouldCallThisBack;

  constructor(@Inject('Auth') auth: IAuth, 
              @Inject('Database') database: IDatabase) {
    
    this.auth = auth;
    this.database = database;
    
    this.userUid = "";
  }

  getAuth() {
    return this.auth;
  }

  getDatabase() {
    return this.database;
  }

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

  logout(callback) {
    var self = this;

    var myCallback = function(result) {
      self.userUid = "";      
    }

    this.getAuth().logout(myCallback);

    callback();
  }

  setFavorite(post, callback) {
    this.getDatabase().setFavorite(this.userUid, post, callback);
  }

  removeFromFavorites(id, callback) {
    this.getDatabase().removeFromFavorites(this.userUid, id, callback);
  }

  isFavorite(id, callback) {
    this.getDatabase().isFavorite(this.userUid, id, callback);
  }

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

  saveUserInfoFromForm(uid, firstName, lastName, email, program, campus, callback) {
    var self = this;
    this.getDatabase().saveUserInfoFromForm(uid, firstName, lastName, email, program, campus, callback);
  }

  saveUserInfoFromOAuth(uid, displayName, email, provider) {
    this.getDatabase().saveUserInfoFromOAuth(uid, displayName, email, provider);
  }

  loginWithEmail(email, password, callback) {
    var self = this;
    this.shouldCallThisBack = callback;

    var myCallback = function(user) {
      self.userUid = user.uid;
      self.shouldCallThisBack(user);
    }

    this.getAuth().loginWithEmail(email, password, myCallback);
  }

  isLoggedIn() {
    return this._isLoggedIn;
  }
}

