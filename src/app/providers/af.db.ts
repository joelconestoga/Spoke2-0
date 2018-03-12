import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Database } from "./i.db";

@Injectable()
export class AFDb implements Database {

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

