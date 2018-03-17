import { IAuth } from "./i.auth";

export class AuthMock implements IAuth {

   public auth = null;
   public result = null;

   loginWithGoogle(callback) {
      callback(this.result);
   }
     
   loginWithFacebook(callback) {
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

   logout(callback: any) {
      throw new Error("Method not implemented.");
   }  

   registerUser(email: any, password: any, callback: any) {
      throw new Error("Method not implemented.");
   }

   loginWithEmail(email: any, password: any, callback: any) {
      throw new Error("Method not implemented.");
   }
}