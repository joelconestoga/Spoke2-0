import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {
    
  constructor(private http: Http) { }
  id; // empty variable to store a post id
  baseURL = "http://spokeonline.com/";
  postsUrl = "https://public-api.wordpress.com/wp/v2/sites/spoketest.wordpress.com/"; // base url of the REST API json file
  featuredImage = this.postsUrl + "posts._embedded" + "['wp:featuredmedia'][0].source_url"; // path to fetch the featured image of a post


  getCoverHighlight() {   // gets the latest post. In the HTML it's the largest one displayed on top of the TOP STORIES page.  I did this only for design purposes, since I couldnt find a better way to arrange posts through ngFor
    return this.http.get(this.postsUrl + `posts/?_embed&per_page=1&offset=3`)
    .map(response => response.json() as any[]);    
  }
  getCoverRowOne() {   // gets posts number 2 and 3 from the latest posts. I did this only for design purposes, since I couldnt find a better way to arrange posts through ngFor
    return this.http.get(this.postsUrl + `posts/?_embed&per_page=2&offset=5`)
    .map(response => response.json() as any[]);
  }  
  getCoverRowTwo() { // gets posts number 4 and 5 from the latest posts.  I did this only for design purposes, since I couldnt find a better way to arrange posts through ngFor
    return this.http.get(this.postsUrl + `posts/?_embed&per_page=2&offset=7`)
    .map(response => response.json() as any[]);
  }
  
  getPostId(id) {   // it receives the id of the selected postf rom HomeComponent and attributes it to the "id" variable, to be used in the getPost() function
    this.id = id; 
  }

  getPost() {   // it throws the id of the selected post into the url to retrieve data of the specific post to an array   
    return this.http.get(this.postsUrl + `posts/${this.id}`)
    .map((response: Response) => response.json());
  }

  getMorePosts(id: number, offset: number, count: number) {

  }
  
  data: any[] = []; // creates an empty array

  getCategories(per_page) {     // it gets the from all categories + category's id + category's name.
    return this.http.get(`https://public-api.wordpress.com/wp/v2/sites/spoketest.wordpress.com/categories`) // url to the Rest API categories' json
      .map((response: Response) => response.json() as any[]) // gets the response and store in an array
      .map((categories: any[]) => {
        categories = categories.filter(x => x.count > 0);
        for(let x = 0; x < categories.length; x++) { // loops through the json fetched from the Rest API
          this.data.push({ id: categories[x].id, name: categories[x].name, offset: per_page, posts: [], forward: true }); // cleans the array getting only category id and category name, and inserts an empty array 'posts' and 'offset'
          // at this point 'data' array has an structure like this: [{id: number, name: string, offset: number, posts: []}]
          this.getData(this.data[x].id, 0, per_page).subscribe(posts => this.data[x].posts = posts); // calls the method 'getData', passing category 'id', 'offset', 'per_page', fetching data from the category id, and assigning the data to that category's 'posts' array          
        }
        return this.data; // returns 'data' array containing 4 posts from each category
      });
  }

  // updateCategoryPosts(id, i, offset, per_page) {    
  //   this.http.get(`https://public-api.wordpress.com/wp/v2/sites/spoketest.wordpress.com/categories`)
  //     .flatMap((data) => data.json()) 
  //     .filter((categories: any) => categories.id === id)
  //     .map((categories) => {
  //       let index = this.data.indexOf(x => x.i);
  //       this.data[index].push({ id: id, offset: 4, per_page:4, posts: [] });
  //       this.getData(id, offset, per_page).subscribe(posts => this.data[index].posts = posts);
  //     }
         
  //       return this.data; 
  //     });
  // }

  getData(id, offset, per_page) { // Offset is initialy set to 0 and it will be increased when loading more data // number of posts loaded is set to 4 (per_page=4)
    return this.http.get(this.postsUrl + `posts/?_embed&categories=${id}&per_page=${per_page}&offset=${offset}`)
      .map((response: Response) => response.json() as any[]);
  }

  getRelatedPosts(){

  }
}

