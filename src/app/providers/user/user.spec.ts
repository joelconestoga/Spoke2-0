import { User } from "./user";
import { AuthMock } from "../auth/auth.mock";
import { DatabaseMock } from "../database/database.mock";
import { Database } from "../database/database";

describe('User', () => {

   let component: User;

   it('Should login with google', () => {
      
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
 
  it('Should login with Facebook', () => {
      
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

  it('is able to logout', () => {
      
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

  it('Should register with Email', () => {
      
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

  it('Should login with Email', () => {
      
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

  it('Should save info from Form', () => {
      
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

  it('Should get favourites', () => {
      
    let afAuthMock = new AuthMock;
    let afdbMock = new DatabaseMock;
    afdbMock.result = { "registeredUsers": {
                                "userUid":"xxx"
                              },
                              "Favourites": {
                                                      "FavouritesId":"ttt"
                                                    }
}; 
    let didCalledBack = false;
      
    component = new User(afAuthMock, afdbMock);

    let mycallback = function(userUid){
      userUid = "xxx"; 
    };
    component.userUid = "xxx";
    component.getFavoritesKeys(mycallback);

    expect(component.userUid).toEqual("xxx");
  }); 
  
});
 