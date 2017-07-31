import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
    
  constructor(private http: Http) { }
  // base url of the REST API json file
  apiCategoriesURL = "https://public-api.wordpress.com/wp/v2/sites/spoketest.wordpress.com/categories"; 

  // gets all categories from the REST API
  getCategories() {
    return this.http.get(this.apiCategoriesURL)
    .map((response: Response) => response.json());
  }
}

