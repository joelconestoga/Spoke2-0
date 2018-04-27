import { Component, OnInit, Inject } from '@angular/core';
import { User } from './providers/user/user';
import { Router } from '@angular/router';
import { WordPress } from './providers/wordpress/wordpress';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DialogsService } from './providers/services/dialogs.service';
import { IWordPress } from './providers/wordpress/i.wordpress';
import { IUser } from './providers/user/i.user';

/**
 * This is the Main class that runs before all the other classes.
 * It loads the Menu with Categories and check the User session right after loading the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  /** @hidden*/
  public static APP_DOMAIN = "http://localhost:4200/";
  
  /** @hidden*/
  public categories = [];
  /** @hidden*/
  public categoryId;
  /** @hidden*/
  public isLoggedIn: boolean;
  /** @hidden*/
  public userTooltip: string;
  /** @hidden*/
  public favoriteTooltip: string;

  /**
   * These params are all injected by Dependency Injection.
   * @param wordpress Required to retrieve the list of Categories.
   * @param user Required to check the current user session.
   * @param router Required to navigate to Home when the user logs out.
   * @param dialogsService Simple dialog for confirmation.
   */
  constructor(@Inject('WordPress') public wordpress: IWordPress, 
              @Inject('User') public user: IUser, 
              private router: Router,
              private dialogsService: DialogsService) { }
  
  /**
   * On initialization, load the Menu with Categories and check the current user session.
   */
  ngOnInit() {
    this.loadCategoriesForMenu();
    this.checkUserSession();
  }

  /**
   * Redirect to Login page or ask it the user really wants to log out.
   */
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
  
  /**
   * If logged in, redirect to Favourites page. Otherwise navigate to Login page, after confirmation.
   */
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

  /**
   * Requesting all Categories from WordPress.
   */
  loadCategoriesForMenu() {
    this.wordpress.getCategories().subscribe(resData => { 
      this.categories = resData;
    });
  }

  /**
   * Check if there is a current user logged in.
   */
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


