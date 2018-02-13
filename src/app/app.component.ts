import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { AF } from './providers/af';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AppService]
})
export class AppComponent implements OnInit {

  // empty array to store all categories
  public categories = [];

  // variable to assign selected category
  public categoryId;
  public isLoggedIn: boolean;

  constructor(private service: AppService, public afService: AF, private router: Router) {
    
    this.afService.af.authState.subscribe((auth) => {
        if(auth == null) {
          console.log("Not Logged in.");
          this.isLoggedIn = false;
          // this.router.navigate(['login']);
        }
        else {
          console.log("Successfully Logged in.");
          this.afService.displayName = auth.displayName;
          this.afService.email = auth.email;          
          this.isLoggedIn = true;
          // this.router.navigate(['']);
        }
      }
    );
  }
  
  ngOnInit() {
    this.loadCategoriesForMenu();
  }

  logout() {
    this.afService.logout();
  }
  // loading all categories from the data set
  loadCategoriesForMenu() {
    this.service.getCategories().subscribe(resData => { 
      this.categories = resData;
    });
  }

  title = "app";  

  play: false;
  stream(){
    this.play = false;
  }
}
