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

  constructor(private service: AppService, public afService: AF, private router: Router) {}
  
  ngOnInit() {
    this.loadCategoriesForMenu();
    this.checkUserSession();
  }

  logout() {
    var self = this;
    var callback = function(isLoggedId) {
      self.router.navigate(['']);
    }
    this.afService.logout(callback);
  }
  
  // loading all categories from the data set
  loadCategoriesForMenu() {
    this.service.getCategories().subscribe(resData => { 
      this.categories = resData;
    });
  }

  checkUserSession() {
    this.isLoggedIn = false;
    var self = this;
    var callback = function(isLoggedId) {
      self.isLoggedIn = isLoggedId;
    }
    this.afService.checkUserSession(callback);
  }

  play: false;
  stream(){
    this.play = false;
  }
}


