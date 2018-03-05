
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

  constructor(public af: AngularFireAuth, public afd: AngularFireDatabase) {
    this.favorites = this.afd.list('favorites').valueChanges();
  }

  loginWithGoogle() {
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  
  loginWithFacebook() {
    return this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  logout() {
    return this.af.auth.signOut();
  }

  setFavorite(post, callback) {
    var ref = this.afd.database.ref("favorites");
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
    var ref = this.afd.database.ref("favorites");
    ref.child(id).remove(callback);
  }

  checkFavorite(id, callback) {
    var ref = this.afd.database.ref("favorites");
    ref.once("value").then(
      function(snapshot) {
        var hasFavorite = snapshot.hasChild(id.toString());
        callback(hasFavorite);
      }
    );
  }

  getFavoritesKeys(callback) {
    var ref = this.afd.database.ref("favorites");
    ref.once("value").then(
      function(snapshot) {
        callback(snapshot);
      }
    );
  }

  registerUser(email, password) {
    console.log(email)
    return this.af.auth.createUserWithEmailAndPassword(email, password);
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

  loginWithEmail(email, password) {
    return this.af.auth.signInWithEmailAndPassword (email, password);
  }

  addUserInfo(){
    this.afd.list('users').push( { email: this.email, displayName: this.displayName } );
  }
}

