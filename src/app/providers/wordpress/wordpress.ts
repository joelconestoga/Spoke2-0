import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WordPress {

  public static WORDPRESS_URL = "https://public-api.wordpress.com/wp/v2/sites/spoketest.wordpress.com/";
  public static POSTS_URL = WordPress.WORDPRESS_URL + "posts/";
  public static CATEGORIES_URL = WordPress.WORDPRESS_URL + "categories";
  
  // path to fetch the featured image of a post when the WP website is not using the 'Best REST API Featured Images' plugin
  // public static IMAGE_URL = WordPress.POSTS_URL + "posts._embedded" + "['wp:featuredmedia'][0].source_url";
    
  constructor(private http: Http) { }
  
  /* gets the latest post. In the HTML it's the largest one displayed on top of the TOP STORIES page.  
     I did this only for design purposes, since I couldnt find a better way to arrange posts through ngFor */
  getCoverHighlight() {   
    return this.http.get(WordPress.POSTS_URL + `?_embed&per_page=1&offset=3`)
    .map(response => response.json() as any[]);    
  }
  
  /* gets posts number 2 and 3 from the latest posts. I did this only for design purposes, 
     since I couldnt find a better way to arrange posts through ngFor */
  getCoverRowOne() {   
    return this.http.get(WordPress.POSTS_URL + `?_embed&per_page=2&offset=5`)
    .map(response => response.json() as any[]);
  }  
  
  /* gets posts number 4 and 5 from the latest posts.  I did this only for design purposes, 
     since I couldnt find a better way to arrange posts through ngFor */
  getCoverRowTwo() { 
    return this.http.get(WordPress.POSTS_URL + `?_embed&per_page=2&offset=7`)
    .map(response => response.json() as any[]);
  }

  // it throws the id of the selected post into the url to retrieve data of the specific post to an array
  getPost(id) {      
    return this.http.get(WordPress.POSTS_URL + `${id}`)
    .map((response: Response) => response.json());
  }
 
  // gets all categories from the REST API
  getCategories() {
    return this.http.get(WordPress.CATEGORIES_URL)
    .map((response: Response) => response.json());
  }

  // gets the from all categories + category's id + category's name.
  getCategoriesWithPosts(per_page) {     
    
    let categories = this.http.get(WordPress.CATEGORIES_URL).map((response: Response) => response.json() as any[]);

    return categories.map(cat => {
      
      // Disconsider empty categories
      cat = cat.filter(c => c.count > 0);
      
      let result = [];
      
      // loops through the json fetched from the Rest API
      for(let i = 0; i < cat.length; i++) {
        
        // Collect only category id, name, offset and prepare an empty array to acommodate its posts
        result.push({ id: cat[i].id, name: cat[i].name, offset: per_page, posts: [], forward: true });
        
        // result is now like this: [ { id: number, name: string, offset: number, posts: [] } ]
        // then we call 'getCategoryPosts' to fetch the category posts into result.posts array 
        this.getCategoryPosts(cat[i].id, 0, per_page).subscribe(
          posts => result[i].posts = posts
        ); 
      }
      return result;
    });    
  }
  
  // Offset is initialy set to 0 and it will be increased when loading more data 
  // number of posts loaded is set to 4 (per_page=4)
  getCategoryPosts(id, offset, per_page) { 
    return this.http.get(WordPress.POSTS_URL + `?_embed&categories=${id}&per_page=${per_page}&offset=${offset}`)
      .map((response: Response) => response.json() as any[]);
  }

  getRelatedPosts(catId){
    return this.http.get(WordPress.POSTS_URL + `?_embed&categories=${catId}&per_page=3`)
      .map((response: Response) => response.json() as any[]);
  }
  
  getPostsForIds(ids) {   
    return this.http.get(WordPress.POSTS_URL + `?include=` + ids.toString())
    .map(response => response.json() as any[]);
  }    
  
  sharedpost(id){
    return this.http.get(WordPress.POSTS_URL + `${id}`).map((response: Response) => response.json());
  }
}

