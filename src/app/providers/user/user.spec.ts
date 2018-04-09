import { User } from "./user";
import { AuthMock } from "../auth/auth.mock";
import { DatabaseMock } from "../database/database.mock";
import { Database } from "../database/database";

describe('User', () => {

  let component: User;

  it('checkUserSession LoggedIn', () => {

    let callBackMock = function(logged, notLogged) {
      if (!logged) {
        throw new Error("Not logged!!");
      }
    }

    let afAuthMock = new AuthMock;
    afAuthMock.result = { "uid":"xxx",
                          "displayName":"yyy",
                          "email":"zzz",
                        };

    component = new User(afAuthMock, null);
   
    component.checkUserSession(callBackMock);

    expect(component._isLoggedIn).toEqual(true);
    expect(component.displayName).toEqual("yyy");
    expect(component.email).toEqual("zzz");
    expect(component.userUid).toEqual("xxx");
  }); 

  it('checkUserSession LoggedOut', () => {

    let callBackMock = function(logged, notLogged) {
      if (logged) {
        throw new Error("Logged in!!");
      }
    }

    let afAuthMock = new AuthMock;

    component = new User(afAuthMock, null);
   
    component.checkUserSession(callBackMock);

    expect(component._isLoggedIn).toEqual(false);
    expect(component.displayName).toBeUndefined();
    expect(component.email).toBeUndefined();
    expect(component.userUid).toEqual("");
  }); 

  it('loginWithGoogle', () => {
      
    let afAuthMock = new AuthMock;
    afAuthMock.result = { "user": {
                                    "uid":"xxx",
                                    "displayName":"yyy",
                                    "email":"zzz",
                                  },
                          "additionalUserInfo": {
                                                  "providerId":"ttt"
                                                }
                        };
  
    let afdbMock = new DatabaseMock;
      
    component = new User(afAuthMock, afdbMock);
    
    component.loginWithGoogle(null);

    expect(component.userUid).toEqual("xxx");
    expect(afdbMock.uid).toEqual("xxx");
    expect(afdbMock.displayName).toEqual("yyy");
    expect(afdbMock.email).toEqual("zzz");
    expect(afdbMock.provider).toEqual("ttt");
  }); 
 
  it('loginWithFacebook', () => {
      
    let afAuthMock = new AuthMock;
    afAuthMock.result = { "user": {
                                    "uid":"xxx",
                                    "displayName":"yyy",
                                    "email":"zzz",
                                  },
                          "additionalUserInfo": {
                                                  "providerId":"ttt"
                                                }
                        };
      
    let afdbMock = new DatabaseMock;
      
    component = new User(afAuthMock, afdbMock);
    
    component.loginWithFacebook(null);

    expect(component.userUid).toEqual("xxx");
    expect(afdbMock.uid).toEqual("xxx");
    expect(afdbMock.displayName).toEqual("yyy");
    expect(afdbMock.email).toEqual("zzz");
  }); 

  it('logout', () => {
      
    let afAuthMock = new AuthMock;
    let didCalledBack = false;
      
    component = new User(afAuthMock, null);
    component.userUid = '555';
  
    let mycallback = function(){
      didCalledBack = true;
    };
    
    component.logout(mycallback);

    expect(component.userUid).toEqual("");
    expect(didCalledBack).toBeTruthy();
  }); 

  it('registerUser', () => {
      
    let afAuthMock = new AuthMock;
    afAuthMock.result = { "user": {
                                    "uid":"xxx",
                                    "email":"yyy",
                                    "password":"zzz",
                                  },
                          "additionalUserInfo": {
                                                  "providerId":"ttt"
                                                }
                        };
      
    let afdbMock = new DatabaseMock;
    let didCalledBack = false;
      
    component = new User(afAuthMock, null);

    let mycallback = function(){
      this.userUid = "xxx";
      didCalledBack = true;
    };
    
    component.registerUser("yyy","zzz",mycallback);

    expect(component.userUid).toEqual("xxx");
    expect(afAuthMock.email).toEqual("yyy");
    expect(afAuthMock.password).toEqual("zzz");
  }); 

  it('loginWithEmail', () => {
      
    let afAuthMock = new AuthMock;
     afAuthMock.result = { "user": {
                                    "uid":"xxx",
                                  }
                        }; 
      
    let afdbMock = new DatabaseMock;
    let didCalledBack = false;
      
    component = new User(afAuthMock, null);

    let mycallback = function(){
      this.userUid = "xxx";
      didCalledBack = true;
    };
    
    component.loginWithEmail("yyy","zzz",mycallback);

    expect(component.userUid).toEqual("xxx");
    expect(afAuthMock.email).toEqual("yyy");
    expect(afAuthMock.password).toEqual("zzz");
  }); 

  it('saveUserInfoFromForm', () => {
      
    let afAuthMock = new AuthMock;
    let afdbMock = new DatabaseMock;
    let didCalledBack = false;
      
    component = new User(null, afdbMock);

    let mycallback = function(){
      didCalledBack = true;
    };
    
    component.saveUserInfoFromForm("aaa","bbb","ccc","ddd","eee","fff",mycallback);

    expect(afdbMock.uid).toEqual("aaa");
    expect(afdbMock.firstName).toEqual("bbb");
    expect(afdbMock.lastName).toEqual("ccc");
    expect(afdbMock.email).toEqual("ddd");
    expect(afdbMock.program).toEqual("eee");
    expect(afdbMock.campus).toEqual("fff");
  }); 

  it('isFavorite True', () => {
      
    let afdbMock = new DatabaseMock;
    afdbMock.favorites.push(22);
      
    component = new User(null, afdbMock);

    let mycallback = function(isFavorite){
      if (!isFavorite) {
        throw new Error("Should be favourite!!");
      }
    };
    
    component.isFavorite(22, mycallback);
  }); 

  it('isFavorite False', () => {
      
    let afdbMock = new DatabaseMock;
    afdbMock.favorites.push(22);
      
    component = new User(null, afdbMock);

    let mycallback = function(isFavorite){
      if (isFavorite) {
        throw new Error("Should not be favourite!!");
      }
    };
    
    component.isFavorite(123, mycallback);
  }); 

  it('getFavoritesKeys', () => {
      
    let afAuthMock = new AuthMock;
    let afdbMock = new DatabaseMock;
    let didCalledBack = false;
      
    component = new User(afAuthMock, afdbMock);

    let mycallback = function(userUid){
      component.userUid = "xxx";
    };
    
    component.getFavoritesKeys(mycallback);

    expect(component.userUid).toEqual("xxx");
  }); 

  it('removeFromFavorites', () => {
      
    let afAuthMock = new AuthMock;
    let afdbMock = new DatabaseMock;
    let didCalledBack = false;

    component = new User(afAuthMock, afdbMock);

    let mycallback = function(userUid){
      component.userUid = "xxx";
    };
    
    component.removeFromFavorites("xxx",mycallback);

    expect(component.userUid).toEqual("xxx");
  });
  
  it('saveUserInfoFromOAuth', () => {
      
    let afAuthMock = new AuthMock;
    let afdbMock = new DatabaseMock;
      
    component = new User(afAuthMock, afdbMock);

    component.saveUserInfoFromOAuth("xxx","yyy","zzz","ttt");

    expect(afdbMock.uid).toEqual("xxx");
    expect(afdbMock.displayName).toEqual("yyy");
    expect(afdbMock.email).toEqual("zzz");
    expect(afdbMock.provider).toEqual("ttt");
  }); 

  it('setFavorite', () => {
      
    let afAuthMock = new AuthMock;
    let afdbMock = new DatabaseMock;
      
    component = new User(afAuthMock, afdbMock);
    let mycallback = function(){

      component.userUid = "xxx";
    };

    component.setFavorite("xxx",mycallback);

    expect(component.userUid).toEqual("xxx");

  }); 

});
 