import { Component, Inject } from '@angular/core';
import { User } from '../providers/user/user';
import { Router } from '@angular/router';
import { IUser } from '../providers/user/i.user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public error: any;
  
  constructor(@Inject('User') private user: IUser, private router: Router) { }

  loginWithGoogle() {
    var self = this;

    var callback = function(isLoggedIn) {
      self.router.navigate(['']);
    }

    this.user.loginWithGoogle(callback);
  }

  loginWithFacebook() {
    var self = this;

    var callback = function(isLoggedIn) {
      self.router.navigate(['']);
    }

    this.user.loginWithFacebook(callback);
  }

  loginWithEmail(event, email, password){
    event.preventDefault();

    var self = this;
    var callback = function(user) {
      self.router.navigate(['']);
    }

    this.user.loginWithEmail(email, password, callback);
  }
}
