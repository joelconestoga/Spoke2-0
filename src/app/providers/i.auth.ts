export interface Auth {

   checkUserSession(callbackLoggedIn, callbackNotLogged);
   loginWithGoogle(callback);

}
