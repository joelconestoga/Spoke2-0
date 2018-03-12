
import { Injectable, Inject } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Persistence } from "./i.persistence";
import { Auth } from "./i.auth";
import { Database } from "./i.db";


@Injectable()
export class AF implements Persistence {

  public displayName: string;
  public email: string;

  public userUid: string;
  public isLoggedIn: boolean;

  public af: AngularFireAuth;
  public af2: Auth;
  public afd: AngularFireDatabase;
  public afd2: Database;

  constructor(af: AngularFireAuth, afd: AngularFireDatabase, 
    @Inject('Auth') af2: Auth, @Inject('Database') afd2: Database) {
    
    this.af = af;
    this.af2 = af2;
    this.afd = afd;
    this.afd2 = afd2;
    
    this.userUid = "";
  }

  getAf() {
    return this.af2;
  }

  getAfd() {
    return this.afd2;
  }

  checkUserSession(callback) {
    var self = this;

    var callbackLoggedIn = function(auth) {
      console.log("Successfully Logged in.");
      console.log(auth);
      self.displayName = auth.displayName;
      self.email = auth.email;
      self.userUid = auth.uid;          
      self.isLoggedIn = true;
      callback(self.isLoggedIn, self.email);
    }

    var callbackNotLogged = function(auth) {
      console.log("Not Logged in.");
      self.isLoggedIn = false;
      callback(self.isLoggedIn, self.email);
    }

    this.getAf().checkUserSession(callbackLoggedIn, callbackNotLogged);
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
    
    this.getAf().loginWithGoogle(myCallback);
    
    if (callback) {
      callback(self.isLoggedIn);
    }
  }
  
  loginWithFacebook() {
    var self = this;
    return this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
      function(result) {
        console.log(result);
        self.userUid = result.user.uid;
        self.saveUserInfoFromOAuth(result.user.uid, 
          // result.additionalUserInfo.profile.first_name,
          // result.additionalUserInfo.profile.last_name,
          result.user.displayName,
          result.user.email,
          result.additionalUserInfo.providerId);
}
    );
  }

  logout(callback) {
    var self = this;
    return this.af.auth.signOut().then(
      function(result) {
        self.userUid = "";
        callback();
      }
    );
  }

  setFavorite(post, callback) {
    var ref = this.afd.database.ref("registeredUsers/" + this.userUid + "/favorites");
    ref.child(post.id).set(
      { 
        id: post.id,
        title: post.title.rendered,
        category: post.categories['0'],
        background: post.featured_media_url,
        timestamp: Date.now() 
      }, 
      callback);
  }

  removeFromFavorites(id, callback) {
    var ref = this.afd.database.ref("registeredUsers/" + this.userUid + "/favorites");
    ref.child(id).remove(callback);
  }

  checkFavorite(id, callback) {
    var ref = this.afd.database.ref("registeredUsers/" + this.userUid + "/favorites");
    ref.once("value").then(
      function(snapshot) {
        var hasFavorite = snapshot.hasChild(id.toString());
        callback(hasFavorite);
      }
    );
  }

  getFavoritesKeys(callback) {
    var ref = this.afd.database.ref("registeredUsers/" + this.userUid + "/favorites");
    ref.once("value").then(
      function(snapshot) {
        callback(snapshot);
      }
    );
  }

  registerUser(email, password) {
    var self = this;
    return this.af.auth.createUserWithEmailAndPassword(email, password).then(
      function(user) {
        self.userUid = user.uid;
        return user;
      }
    );
  }

  saveUserInfoFromForm(uid, firstName, lastName, email, program, campus) {
    return this.afd.object('registeredUsers/' + uid).set( 
      { 
        firstName: firstName, 
        lastName: lastName, 
        email: email,
        program: program,
        campus: campus,
      } );
  }

  saveUserInfoFromOAuth(uid, displayName, email, provider) {
    this.getAfd().saveUserInfoFromOAuth(uid, displayName, email, provider);
  }

  loginWithEmail(email, password) {
    var self = this;
    return this.af.auth.signInWithEmailAndPassword(email, password).then(
      function(user) {
        self.userUid = user.uid;
      }
    );
  }

}

