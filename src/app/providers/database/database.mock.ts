import { IDatabase } from "./i.database";

export class DatabaseMock implements IDatabase {

   public uid;
   public displayName;
   public email;
   public provider;
   public result = null;

   public firstName;
   public lastName;
   public program;
   public campus;
   public userUid;

   saveUserInfoFromOAuth(uid, displayName, email, provider) {
      this.uid = uid;
      this.displayName = displayName;
      this.email = email;
      this.provider = provider;
   }  

   setFavorite(userUid: any, post: any, callback: any) {
      throw new Error("Method not implemented.");
   }

   removeFromFavorites(userUid: any, id: any, callback: any) {
      throw new Error("Method not implemented.");
   }

   isFavorite(userUid: any, id: any, callback: any) {
      throw new Error("Method not implemented.");
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

