import { Component, Inject } from '@angular/core';
import { User } from '../providers/user/user';
import { Router } from '@angular/router';
import { IUser } from '../providers/user/i.user';

/**
 * This class has all the logic behind the Login page.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  /** @hidden*/
  public error: any;
  
  constructor(@Inject('User') private user: IUser, private router: Router) { }

  /** Calls the User class to execute login with Google Auth. */
  loginWithGoogle() {
    var self = this;

    var callback = function(isLoggedIn) {
      self.router.navigate(['']);
    }

    this.user.loginWithGoogle(callback);
  }

  /** Calls the User class to execute login with Facebook Auth. */
  loginWithFacebook() {
    var self = this;

    var callback = function(isLoggedIn) {
      self.router.navigate(['']);
    }

    this.user.loginWithFacebook(callback);
  }

  /** Calls the User class to execute login with email/password. */
  loginWithEmail(event, email, password){
    event.preventDefault();

    var self = this;
    var callback = function(user) {
      self.router.navigate(['']);
    }

    this.user.loginWithEmail(email, password, callback);
  }
}
