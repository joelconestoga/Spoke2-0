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

});
 