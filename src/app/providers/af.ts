
import { Injectable } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class AF {

  public users: Observable<any>;
  public favorites: Observable<any>;
  public displayName: string;
  public email: string;

  public userUid: string;

  constructor(public af: AngularFireAuth, private afd: AngularFireDatabase) {
    this.favorites = this.afd.list('favorites').valueChanges();
    this.userUid = "";
  }

  loginWithGoogle() {
    var self = this;
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      function(result) {
        self.userUid = result.user.uid;
        self.saveUserInfoFromOAuth(result.user.uid, 
                                  result.additionalUserInfo.profile.given_name,
                                  result.additionalUserInfo.profile.family_name,
                                  result.user.email,
                                  result.additionalUserInfo.providerId);
      }
    );
  }
  
  loginWithFacebook() {
    var self = this;
    return this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
      function(result) {
        self.userUid = result.user.uid;
        self.saveUserInfoFromOAuth(result.user.uid, 
          result.additionalUserInfo.profile.first_name,
          result.additionalUserInfo.profile.last_name,
          result.additionalUserInfo.profile.email,
          result.additionalUserInfo.providerId);
}
    );
  }

  logout() {
    var self = this;
    return this.af.auth.signOut().then(
      function(result) {
        self.userUid = "";
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

  saveUserInfoFromOAuth(uid, firstName, lastName, email, provider) {
    return this.afd.object('registeredUsers/' + uid).set( 
      { 
        firstName: firstName, 
        lastName: lastName, 
        email: email,
        provider: provider,
      } );
  }

  loginWithEmail(email, password) {
    var self = this;
    return this.af.auth.signInWithEmailAndPassword (email, password).then(
      function(user) {
        self.userUid = user.uid;
      }
    );
  }

  addUserInfo(){
    this.afd.list('users').push( { email: this.email, displayName: this.displayName } );
  }
}

