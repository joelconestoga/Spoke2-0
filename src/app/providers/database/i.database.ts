/**
 * Interface for Database service. This interface allows to Unit Test classes that depend on Database service, by accepting DatabaseMock injection.
 */
export interface IDatabase {

   saveUserInfoFromOAuth(uid, displayName, email, provider);
   saveUserInfoFromForm(uid, firstName, lastName, email, program, campus, callback);
   setFavorite(userUid, post, callback);
   removeFromFavorites(userUid, id, callback);
   isFavorite(userUid, id, callback);
   getFavoritesKeys(userUid, callback);
}
