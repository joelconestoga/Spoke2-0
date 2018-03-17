export interface IAuth {

   checkUserSession(callbackLoggedIn, callbackNotLogged);
   loginWithGoogle(callback);
   loginWithFacebook(callback);
   loginWithEmail(email, password, callback);
   logout(callback);
   registerUser(email, password, callback);

}
