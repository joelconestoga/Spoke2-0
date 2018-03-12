import { AF } from "./af";
import { AFMock } from "../login/afMock";
import { AFAuthMock } from "./af.auth.mock";
import { AFDbMock } from "./af.db.mock";

describe('AFService', () => {

   let component: AF;

   it('Should login with google', () => {
      
    let afAuthMock = new AFAuthMock;
    afAuthMock.result = { "user": {
                                    "uid":"xxx",
                                    "displayName":"yyy",
                                    "email":"zzz",
                                  },
                          "additionalUserInfo": {
                                                  "providerId":"ttt"
                                                }
                        };
      
    let afdbMock = new AFDbMock;
      
    component = new AF(null, null, afAuthMock, afdbMock);
    
    component.loginWithGoogle(null);

    expect(component.userUid).toEqual("xxx");
    expect(afdbMock.uid).toEqual("xxx");
    expect(afdbMock.displayName).toEqual("yyy");
    expect(afdbMock.email).toEqual("zzz");
    expect(afdbMock.provider).toEqual("ttt");
  }); 
 
});
 