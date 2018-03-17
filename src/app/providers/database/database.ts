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

}

