import { Component, Inject } from '@angular/core';
import { AF } from '../providers/af';
import { Router } from '@angular/router';
import { Persistence } from '../providers/i.persistence';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public error: any;
  
  constructor(@Inject('Persistence') private afService: Persistence, private router: Router) { }

  loginWithGoogle() {
    var self = this;

    var callback = function(isLoggedIn) {
      self.router.navigate(['']);
    }

    this.afService.loginWithGoogle(callback);
  }

  loginWithFacebook() {
    this.afService.loginWithFacebook().then((data) => {
      this.router.navigate(['']);
    })
  }

  loginWithEmail(event, email, password){
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
      this.router.navigate(['']);
    })
      .catch((error: any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
        }
      });
  }
}
