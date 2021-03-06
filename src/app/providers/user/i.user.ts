/**
 * Interface for User service. This interface allows to Unit Test classes that depend on User service, by accepting UserMock injection.
 */
export interface IUser {

  getAuth();

  checkUserSession(callback);

  loginWithGoogle(callback);
  
  loginWithFacebook(callback);

  logout(callback);

  setFavorite(post, callback);

  removeFromFavorites(id, callback);

  isFavorite(id, callback);

  getFavoritesKeys(callback);

  registerUser(email, password, callback);

  saveUserInfoFromForm(uid, firstName, lastName, email, program, campus, callback);

  saveUserInfoFromOAuth(uid, displayName, email, provider);

  loginWithEmail(email, password, callback);

  isLoggedIn();
}

