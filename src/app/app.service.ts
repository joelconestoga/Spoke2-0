import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
    
  constructor(private http: Http) { }
  apiCategoriesURL = "https://public-api.wordpress.com/wp/v2/sites/spoketest.wordpress.com/categories"; // base url of the REST API json file

    // it gets all categories from the REST API
  getCategories() {
    return this.http.get(this.apiCategoriesURL)
    .map((response: Response) => response.json());
  }
 
  // getCategories(per_page) {     // it gets the from all categories + category's id + category's name.
  //   return this.http.get(`https://public-api.wordpress.com/wp/v2/sites/spoketest.wordpress.com/categories`) // url to the Rest API categories' json
  //     .map((response: Response) => response.json() as any[]) // gets the response and store in an arrat
  //     .map((categories: any[]) => {
  //       categories = categories.filter(x => x.count > 0);
  //       let data: any[] = [];
  //       for(let x = 0; x < categories.length; x++) { // loops through the json fetched from the Rest API
  //         data.push({ id: categories[x].id, name: categories[x].name, count: categories[x].count, offset: per_page, posts: [] }); // cleans the array getting only category id and category name, and inserts an empty array 'posts' and 'offset'
  //         // at this point 'data' array has an structure like this: [{id: number, name: string, offset: number, posts: []}]
  //         this.getData(data[x].id, 0, per_page).subscribe(posts => data[x].posts = posts); // calls the method 'getData', passing category 'id', 'offset', 'per_page', fetching data from the category id, and assigning the data to that category's 'posts' array          
  //       }
  //       return data; // returns 'data' array containing 4 posts from each category
  //     });
  // }

  // getData(id, offset, per_page) { // Offset is initialy set to 0 and it will be increased when loading more data // number of posts loaded is set to 4 (per_page=4)
  //   return this.http.get(this.apiURL + `posts/?_embed&categories=${id}&per_page=${per_page}&offset=${offset}`)
  //     .map((response: Response) => response.json() as any[]);
  // }
}

