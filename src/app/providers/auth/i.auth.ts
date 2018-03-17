export interface IAuth {

   checkUserSession(callbackLoggedIn, callbackNotLogged);
   loginWithGoogle(callback);

}
