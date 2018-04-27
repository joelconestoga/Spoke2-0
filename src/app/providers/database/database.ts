import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { IDatabase } from "./i.database";

/**
 * This class is reponsible for all operations with Firebase Realtime Database.
 * It is a wrapper class for the third party library AngularFireDatabase.
 */
@Injectable()
export class Database implements IDatabase {

  constructor(private afd: AngularFireDatabase) {}

  /**
   * Save the user details right after an authentication with Google/Facebook Auth.
   * @param uid The user ID on Firebase.
   * @param displayName User's name returned by Auth.
   * @param email User's email.
   * @param provider Provider (i.e. Google, Facebook).
   */
  saveUserInfoFromOAuth(uid, displayName, email, provider) {
    return this.afd.object('registeredUsers/' + uid).update( 
      { 
        displayName: displayName,
        email: email,
        provider: provider,
      } 
    );
  }  

  /**
   * Persisting the user's data for Registration.
   * @param uid 
   * @param firstName 
   * @param lastName 
   * @param email 
   * @param program 
   * @param campus 
   * @param callback Method to be called after the persistence succeeds.
   */
  saveUserInfoFromForm(uid, firstName, lastName, email, program, campus, callback) {
    this.afd.object('registeredUsers/' + uid).set( 
      { 
        firstName: firstName, 
        lastName: lastName, 
        email: email,
        program: program,
        campus: campus,
      }).then(callback);
  }
  
  /**
   * Save a post id as Favourite under the user's record on Firebase.
   * @param userUid Firebase id.
   * @param post 
   * @param callback Method to be called after persistence succeeds.
   */
  setFavorite(userUid, post, callback) {
    var ref = this.afd.database.ref("registeredUsers/" + userUid + "/favorites");
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

  /**
   * Remove a post id from Favourites for a specific user on Firebase.
   * @param userUid Firebase id.
   * @param id Post id.
   * @param callback Method to be called after persistence succeeds.
   */
  removeFromFavorites(userUid, id, callback) {
    var ref = this.afd.database.ref("registeredUsers/" + userUid + "/favorites");
    ref.child(id).remove(callback);
  }

  /**
   * Check if a post is Favourite for a user on Firebase.
   * @param userUid Firebase id.
   * @param id Post id.
   * @param callback Method to be called after persistence succeeds.
   */
  isFavorite(userUid, id, callback) {
    var ref = this.afd.database.ref("registeredUsers/" + userUid + "/favorites");
    ref.once("value").then(
      function(snapshot) {
        var hasFavorite = snapshot.hasChild(id.toString());
        callback(hasFavorite);
      }
    );
  }

  /**
   * Retrieve all Favourite posts ids persisted on Firebase for a particular user.
   * @param userUid Firebase id.
   * @param callback Method to be called after obtained the data.
   */
  getFavoritesKeys(userUid, callback) {
    var ref = this.afd.database.ref("registeredUsers/" + userUid + "/favorites");
    ref.once("value").then(
      function(snapshot) {
        callback(snapshot);
      }
    );
  }

}

