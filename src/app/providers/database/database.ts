import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { IDatabase } from "./i.database";

@Injectable()
export class Database implements IDatabase {

  constructor(private afd: AngularFireDatabase) {}

  saveUserInfoFromOAuth(uid, displayName, email, provider) {
    return this.afd.object('registeredUsers/' + uid).update( 
      { 
        // firstName: firstName, 
        // lastName: lastName, 
        displayName: displayName,
        email: email,
        provider: provider,
      } 
    );
  }  

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

  removeFromFavorites(userUid, id, callback) {
    var ref = this.afd.database.ref("registeredUsers/" + userUid + "/favorites");
    ref.child(id).remove(callback);
  }

  isFavorite(userUid, id, callback) {
    var ref = this.afd.database.ref("registeredUsers/" + userUid + "/favorites");
    ref.once("value").then(
      function(snapshot) {
        var hasFavorite = snapshot.hasChild(id.toString());
        callback(hasFavorite);
      }
    );
  }

  getFavoritesKeys(userUid, callback) {
    var ref = this.afd.database.ref("registeredUsers/" + userUid + "/favorites");
    ref.once("value").then(
      function(snapshot) {
        callback(snapshot);
      }
    );
  }

}

