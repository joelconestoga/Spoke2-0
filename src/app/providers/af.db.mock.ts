import { Database } from "./i.db";

export class AFDbMock implements Database {

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

}

