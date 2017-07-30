import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

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

  constructor(private service: AppService) { }

  // loading all categories from the data set
  getCategories() {
    this.service.getCategories().subscribe(resData => this.categories = resData);
  }

  play: false;
  stream(){
    this.play = false;
  }

  ngOnInit() {
    this.getCategories();
  }
}


