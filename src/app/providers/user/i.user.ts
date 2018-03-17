export interface IUser {

  getAf();

  checkUserSession(callback);

  loginWithGoogle(callback);
  
  loginWithFacebook();

  logout(callback);

  setFavorite(post, callback);

  removeFromFavorites(id, callback);

  checkFavorite(id, callback);

  getFavoritesKeys(callback);

  registerUser(email, password);

  saveUserInfoFromForm(uid, firstName, lastName, email, program, campus);

  saveUserInfoFromOAuth(uid, displayName, email, provider);

  loginWithEmail(email, password);

}

