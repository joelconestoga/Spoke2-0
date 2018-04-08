import { Component, OnInit, Inject } from '@angular/core';
import { User } from './providers/user/user';
import { Router } from '@angular/router';
import { WordPress } from './providers/wordpress/wordpress';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DialogsService } from './providers/services/dialogs.service';
import { IWordPress } from './providers/wordpress/i.wordpress';
import { IUser } from './providers/user/i.user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  public static APP_DOMAIN = "http://localhost:4200/";

  // empty array to store all categories
  public categories = [];

  // variable to assign selected category
  public categoryId;
  public isLoggedIn: boolean;
  public userTooltip: string;
  public favoriteTooltip: string;

  constructor(@Inject('WordPress') public wordpress: IWordPress, 
              @Inject('User') public user: IUser, 
              private router: Router,
              private dialogsService: DialogsService) { }
  
  ngOnInit() {
    this.loadCategoriesForMenu();
    this.checkUserSession();
  }

  toggleAuthentication() {
    if (this.isLoggedIn) {
      let self = this;

      this.dialogsService.confirm("", "Would you like to log out?").subscribe(function(ok) {
        if (ok) {
          var callback = function(isLoggedId) {
            self.isLoggedIn = false;
            self.router.navigate(['']);
          }
          self.user.logout(callback);
        }
      });
    } else {
      this.router.navigate(['/login']);      
    }
  }
  
  goToFavorites() {
    if (this.isLoggedIn) {
      this.router.navigate(['/favorites']);
    } else {
      if (this.router.url == "/login") { return; }

      let self = this;
      this.dialogsService.confirm("Log In", "Log in to see your favourites.", "Login")
      .subscribe(function(ok) {
        if (ok) {
          self.router.navigate(['/login']);
        }
      });
    }
  }

  // loading all categories from the data set
  loadCategoriesForMenu() {
    this.wordpress.getCategories().subscribe(resData => { 
      this.categories = resData;
    });
  }

  checkUserSession() {
    this.isLoggedIn = false;
    this.userTooltip = "Log in";
    this.favoriteTooltip = "Favourites (login required)";
    
    var self = this;
    var callback = function(isLoggedIn, email = "") {
      self.isLoggedIn = isLoggedIn;
      self.userTooltip = isLoggedIn ? "Logout (" + email + ")" : "Log in";
      self.favoriteTooltip = isLoggedIn ? "My favourites" : "Favourites (login required)";
    }
    
    this.user.checkUserSession(callback);
  }

  play: false;
  stream(){
    this.play = false;
  }
}


