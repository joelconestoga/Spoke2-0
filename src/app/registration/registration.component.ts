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
  
  constructor(private afService: User, private router: Router) { 
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
    
    this.afService.registerUser(this.email, this.password).then((user) => {
      this.afService.saveUserInfoFromForm(user.uid, this.firstName, this.lastName, this.email, this.program, this.campus).then(() => {
        this.router.navigate(['']);
      })
        .catch((error) => {
          this.error = error;
        });
    })
      .catch((error) => {
        this.error = error;
        console.log(this.error);
      });
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
