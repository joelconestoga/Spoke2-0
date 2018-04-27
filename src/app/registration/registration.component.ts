import { Component, Inject } from '@angular/core';
import { User } from '../providers/user/user';
import { Router } from '@angular/router';
import { IUser } from '../providers/user/i.user';

/** This class is responsible for all the logic behind Registration page. */
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  
  /** @hidden*/
  firstName: string;
  /** @hidden*/
  lastName: string;
  /** @hidden*/
  email: string;
  /** @hidden*/
  password: string;
  /** @hidden*/
  confirmation: string;
  /** @hidden*/
  program: string;
  /** @hidden*/
  campus: string;
  
  /** @hidden*/
  public error: any;
  /** @hidden*/
  public firstNameInvalid: boolean = false;
  /** @hidden*/
  public lastNameInvalid: boolean = false;
  /** @hidden*/
  public emailInvalid: boolean = false;
  /** @hidden*/
  public passwordInvalid: boolean = false;
  /** @hidden*/
  public confirmationInvalid: boolean = false;
  /** @hidden*/
  public fieldsOk: boolean = false;
  /** @hidden*/
  public isConestogaEmail: boolean = false;
  
  constructor(@Inject('User') public user: IUser, private router: Router) { 
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.confirmation = "";
    this.program = "";
    this.campus = "";
  }
  
  /** Register a new user on Firebase. If it succeeds, persist the rest of the user data on Firebase and redirect to Home page. */
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

  /** Validates all the entry fields. */
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

  /** Checks the consistency of every data input. */
  fieldsAreValid() {
    return !this.firstNameInvalid && !this.lastNameInvalid && !this.emailInvalid &&
    !this.passwordInvalid && !this.confirmationInvalid;
  }

  /** Checks for missing information. */
  fieldsAreNotEmpty() {
    return this.firstName != "" && this.lastName != "" &&
    this.email != "" && this.password != "" && this.confirmation != "";
  }

  /** Checks for password/confirmation consistency. */
  passwordConfirmed() {
    return this.password == this.confirmation && this.password != "";
  }
}
