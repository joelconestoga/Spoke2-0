import { IUser } from "./i.user";
import { Observable } from "rxjs";

export class UserMock implements IUser {

  _isLoggedIn = false;
  favorites = [];
  persistenceError = null;

  constructor(public favoriteKeys: any = null) { }
  
  getAuth() {
    new AngularFireAuthMock;
  }
  checkUserSession(callback: any) {
    return callback(true);
  }
  loginWithGoogle() {
    throw new Error("Method not implemented.");
  }
  loginWithFacebook() {
    throw new Error("Method not implemented.");
  }
  logout(callback: any) {
    throw new Error("Method not implemented.");
  }
  setFavorite(post: any, callback: any) {
    return Observable.of(callback(this.persistenceError));
  }
  removeFromFavorites(id: any, callback: any) {
    return Observable.of(callback(this.persistenceError));
  }
  isFavorite(id: any, callback: any) {
    return Observable.of(callback(this.favorites.indexOf(id) > -1));
  }
  getFavoritesKeys(callback: any) {
    return callback(this.favoriteKeys);
  }
  registerUser(email: any, password: any) {
    throw new Error("Method not implemented.");
  }
  saveUserInfoFromForm(uid: any, firstName: any, lastName: any, email: any, program: any, campus: any) {
    throw new Error("Method not implemented.");
  }
  saveUserInfoFromOAuth(uid: any, displayName: any, email: any, provider: any) {
    throw new Error("Method not implemented.");
  }
  loginWithEmail(email: any, password: any) {
    throw new Error("Method not implemented.");
  }
  isLoggedIn() {
    return this._isLoggedIn;
  }
}

export class AngularFireAuthMock {
   public auth: AuthMock;
   constructor() { this.auth = new AuthMock; }
}

export class AuthMock {

   signInWithPopup(provider: any): Promise<any> {
      let result = { "user": { "uid": "123" } };

      const promise = new Promise((resolve, reject) => {
         resolve(result);
         reject();
       });
      
      return promise;
   }
}