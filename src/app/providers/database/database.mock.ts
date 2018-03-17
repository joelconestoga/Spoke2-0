import { IDatabase } from "./i.database";

export class DatabaseMock implements IDatabase {

   public uid;
   public displayName;
   public email;
   public provider;

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

   getFavoritesKeys(userUid: any, callback: any) {
      throw new Error("Method not implemented.");
   }

   saveUserInfoFromForm(uid: any, firstName: any, lastName: any, email: any, program: any, campus: any, callback: any) {
      throw new Error("Method not implemented.");
   }

}

