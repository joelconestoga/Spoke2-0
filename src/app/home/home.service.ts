import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {
    
  constructor(private http: Http) { }

  website = "http://localhost:4200/"; //this url has to be updated to proper url when the project is to be deployed
  baseURL = "https://public-api.wordpress.com/wp/v2/sites/spoketest.wordpress.com/";
  postsUrl = this.baseURL + "posts/"; // url of the REST API json file for POSTS
  categoriesUrl = this.baseURL + "categories" // url of the REST API json file for CATEGORIES
  // featuredImage = this.postsUrl + "posts._embedded" + "['wp:featuredmedia'][0].source_url"; // path to fetch the featured image of a post when the WP website is not using the 'Best REST API Featured Images' plugin
  id; // postId
  catId; //categoryId

  // gets the latest post. In the HTML it's the largest one displayed on top of the TOP STORIES page.  I did this only for design purposes, since I couldnt find a better way to arrange posts through ngFor
  getCoverHighlight() {   
    return this.http.get(this.postsUrl + `?_embed&per_page=1&offset=3`)
    .map(response => response.json() as any[]);    
  }
  // gets posts number 2 and 3 from the latest posts. I did this only for design purposes, since I couldnt find a better way to arrange posts through ngFor
  getCoverRowOne() {   
    return this.http.get(this.postsUrl + `?_embed&per_page=2&offset=5`)
    .map(response => response.json() as any[]);
  }  
  // gets posts number 4 and 5 from the latest posts.  I did this only for design purposes, since I couldnt find a better way to arrange posts through ngFor
  getCoverRowTwo() { 
    return this.http.get(this.postsUrl + `?_embed&per_page=2&offset=7`)
    .map(response => response.json() as any[]);
  }

  // receives the id of the selected postf rom HomeComponent and attributes it to the "id" variable, to be used in the getPost() function
  getPostId(id) {   
    this.id = id; 
  }

  // it throws the id of the selected post into the url to retrieve data of the specific post to an array
  getPost() {      
    return this.http.get(this.postsUrl + `${this.id}`)
    .map((response: Response) => response.json());
  }
 
  // gets the from all categories + category's id + category's name.
  getCategories(per_page) {     
    return this.http.get(this.categoriesUrl) // url to the Rest API categories' json
      .map((response: Response) => response.json() as any[]) // gets the response and store in an array
      .map((categories: any[]) => {
        let data: any[] = []; // creates an empty array
        categories = categories.filter(x => x.count > 0);
        for(let x = 0; x < categories.length; x++) { // loops through the json fetched from the Rest API
          data.push({ id: categories[x].id, name: categories[x].name, offset: per_page, posts: [], forward: true }); // cleans the array getting only category id and category name, and inserts an empty array 'posts' and 'offset'
          // at this point 'data' array has an structure like this: [{id: number, name: string, offset: number, posts: []}]
          this.getData(data[x].id, 0, per_page).subscribe(posts => data[x].posts = posts); // calls the method 'getData', passing category 'id', 'offset', 'per_page', fetching data from the category id, and assigning the data to that category's 'posts' array          
        }
        return data;
      });
  }
  
  // Offset is initialy set to 0 and it will be increased when loading more data 
  // number of posts loaded is set to 4 (per_page=4)
  getData(id, offset, per_page) { 
    return this.http.get(this.postsUrl + `?_embed&categories=${id}&per_page=${per_page}&offset=${offset}`)
      .map((response: Response) => response.json() as any[]);
  }

  getCategoryId(catId) {
    this.catId = catId;
  }
  getRelatedPosts(catId){
    return this.http.get(this.postsUrl + `?_embed&categories=${catId}&per_page=3`)
      .map((response: Response) => response.json() as any[]);
  }
  sharedpost(id){
    return this.http.get(this.postsUrl + `${id}`).map((response: Response) => response.json());
  }
}

