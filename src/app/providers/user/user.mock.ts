import { IUser } from "./i.user";

export class UserMock implements IUser {
   getAuth() {
      new AngularFireAuthMock;
   }
   checkUserSession(callback: any) {
      throw new Error("Method not implemented.");
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
      throw new Error("Method not implemented.");
   }
   removeFromFavorites(id: any, callback: any) {
      throw new Error("Method not implemented.");
   }
   isFavorite(id: any, callback: any) {
      throw new Error("Method not implemented.");
   }
   getFavoritesKeys(callback: any) {
      throw new Error("Method not implemented.");
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