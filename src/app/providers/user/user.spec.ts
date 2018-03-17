import { User } from "./user";
import { AuthMock } from "../auth/auth.mock";
import { DatabaseMock } from "../database/database.mock";

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
 
});
 