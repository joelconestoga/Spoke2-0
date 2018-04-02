import { Component } from '@angular/core';
import { User } from '../providers/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmation: string;
  program: string;
  campus: string;
  
  public error: any;
  public firstNameInvalid: boolean = false;
  public lastNameInvalid: boolean = false;
  public emailInvalid: boolean = false;
  public passwordInvalid: boolean = false;
  public confirmationInvalid: boolean = false;
  public fieldsOk: boolean = false;
  public isConestogaEmail: boolean = false;
  
  constructor(private user: User, private router: Router) { 
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.confirmation = "";
    this.program = "";
    this.campus = "";
  }
  
  register(event) {
    event.preventDefault();
    
    var self = this;

    var finalCallback = function(user) {
      self.router.navigate(['']);
    }
    
    var registrationCallback = function(user) {
      self.user.saveUserInfoFromForm(user.uid, self.firstName, self.lastName, self.email, self.program, self.campus, finalCallback);
    }

    this.user.registerUser(self.email, self.password, registrationCallback);
  }

  validate(event, field) {
    switch(field) {
      case 'firstName': {
        this.firstNameInvalid = this.firstName == ""; 
        break;
      }
      case 'lastName': {
        this.lastNameInvalid = this.lastName == ""; 
        break;
      }
      case 'email': {
        this.emailInvalid = this.email == "";
        this.isConestogaEmail = this.email.indexOf("@conestogac.on.ca") > 0; 
        break;
      }
      case 'password': {
        this.passwordInvalid = this.password == "" || this.password != this.confirmation; 
        this.confirmationInvalid = this.confirmation == "" || this.confirmation != this.password; 
        break;
      }
      case 'confirmation': {
        this.passwordInvalid = this.password == "" || this.password != this.confirmation; 
        this.confirmationInvalid = this.confirmation == "" || this.confirmation != this.password; 
        break;
      }
    }

    this.fieldsOk = this.fieldsAreValid() && this.fieldsAreNotEmpty() && this.passwordConfirmed();
  }

  fieldsAreValid() {
    return !this.firstNameInvalid && !this.lastNameInvalid && !this.emailInvalid &&
    !this.passwordInvalid && !this.confirmationInvalid;
  }

  fieldsAreNotEmpty() {
    return this.firstName != "" && this.lastName != "" &&
    this.email != "" && this.password != "" && this.confirmation != "";
  }

  passwordConfirmed() {
    return this.password == this.confirmation && this.password != "";
  }
}
