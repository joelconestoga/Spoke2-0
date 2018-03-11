import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { AF } from './providers/af';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  // empty array to store all categories
  public categories = [];

  // variable to assign selected category
  public categoryId;
  public isLoggedIn: boolean;
  public userTooltip: string;
  public favoriteTooltip: string;

  constructor(private service: AppService, public afService: AF, private router: Router) {}
  
  ngOnInit() {
    this.loadCategoriesForMenu();
    this.checkUserSession();
  }

  toggleAuthentication() {
    if (this.isLoggedIn) {
      var self = this;
      var callback = function(isLoggedId) {
        self.isLoggedIn = false;
        self.router.navigate(['']);
      }
      this.afService.logout(callback);
    } else {
      this.router.navigate(['/login']);      
    }
  }
  
  // loading all categories from the data set
  loadCategoriesForMenu() {
    this.service.getCategories().subscribe(resData => { 
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
    
    this.afService.checkUserSession(callback);
  }

  play: false;
  stream(){
    this.play = false;
  }
}


