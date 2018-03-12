import { Auth } from "./i.auth";

export class AFAuthMock implements Auth {

   public auth = null;
   public result = null;

   loginWithGoogle(callback) {
      callback(this.result);
   }
     
   checkUserSession(callbackLoggedIn, callbackNotLogged) {
      if(this.auth == null) {
         callbackNotLogged(this.auth);
      }
      else {
         callbackLoggedIn(this.auth);
      }
   }

}