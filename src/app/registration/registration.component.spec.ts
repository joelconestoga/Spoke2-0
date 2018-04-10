import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  
  let component: RegistrationComponent;

  it('validate', () => {

    component = new RegistrationComponent(null, null);

    component.validate(null, 'firstName');
    component.validate(null, 'lastName');
    component.validate(null, 'email');
    component.validate(null, 'password');
    component.validate(null, 'confirmation');

    expect(component.fieldsAreValid()).toBeFalsy();
    expect(component.fieldsAreNotEmpty()).toBeFalsy();
    expect(component.passwordConfirmed()).toBeFalsy();

    component.firstName = "joel";
    component.lastName = "matsu";
    component.email = "joel@a.com";
    component.password = "123456";
    component.confirmation = "123456";

    component.validate(null, 'firstName');
    component.validate(null, 'lastName');
    component.validate(null, 'email');
    component.validate(null, 'password');
    component.validate(null, 'confirmation');

    expect(component.fieldsAreValid()).toBeTruthy();
    expect(component.fieldsAreNotEmpty()).toBeTruthy();
    expect(component.passwordConfirmed()).toBeTruthy();
  }); 
  
});
