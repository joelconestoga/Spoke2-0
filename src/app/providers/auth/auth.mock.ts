import { IAuth } from "./i.auth";


export class AuthMock implements IAuth {
    public password;
    public email;

   public auth = null;
   public result = null;

   loginWithGoogle(callback) {
      callback(this.result);
   }
     
   loginWithFacebook(callback) {
      callback(this.result);
   }
     
   checkUserSession(callbackLoggedIn, callbackNotLogged) {
      if(this.result == null) {
         callbackNotLogged(this.result);
      }
      else {
         callbackLoggedIn(this.result);
      }
   }

   logout(callback) {
      callback();
   }

   registerUser(email, password, callback) {
      this.email = email;
      this.password = password;
    callback(this.result);
   }

   loginWithEmail(email, password, callback) {
    this.email = email;
    this.password = password;
    callback(this.result);
   }
}