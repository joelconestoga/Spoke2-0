import { IDatabase } from "./i.database";
import { Observable } from "rxjs";

export class DatabaseMock implements IDatabase {

   public uid;
   public id;
   public displayName;
   public email;
   public provider;
   public result = null;

   public firstName;
   public lastName;
   public program;
   public campus;
   public userUid;
   public post;
   public favorites = [];

   saveUserInfoFromOAuth(uid, displayName, email, provider) {
      this.uid = uid;
      this.displayName = displayName;
      this.email = email;
      this.provider = provider;
   }  

   setFavorite(userUid, post, callback) {
    this.userUid = userUid;
    this.post = post;
    callback(this.userUid);
   }

   removeFromFavorites(userUid, id, callback) {
    this.userUid = userUid;
    this.id = id;
    callback(this.userUid);
   }

   isFavorite(userUid: any, id: any, callback: any) {
    return Observable.of(callback(this.favorites.indexOf(id) > -1));
   }

   getFavoritesKeys(userUid,callback) {
    this.userUid = userUid;
    callback(this.userUid);
   }

   saveUserInfoFromForm(uid, firstName, lastName, email, program, campus, callback) {  
    this.uid = uid;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.program = program;
      this.campus = campus;
      callback(this.result);
   }

}

