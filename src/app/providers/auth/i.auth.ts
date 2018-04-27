/**
 * Interface for Auth service. This interface allows to Unit Test classes that depend on Auth service, by accepting AuthMock injection.
 */
export interface IAuth {

   checkUserSession(callbackLoggedIn, callbackNotLogged);
   loginWithGoogle(callback);
   loginWithFacebook(callback);
   loginWithEmail(email, password, callback);
   logout(callback);
   registerUser(email, password, callback);

}
