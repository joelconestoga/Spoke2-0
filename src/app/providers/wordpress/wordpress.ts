import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { IWordPress } from './i.wordpress';

/**
 * This class is responsible for all requests to WordPress REST API.
 */
@Injectable()
export class WordPress implements IWordPress {

  /** WordPress REST API URL. */
  public static WORDPRESS_URL = "https://public-api.wordpress.com/wp/v2/sites/spoketest.wordpress.com/";
  // public static WORDPRESS_URL = "http://dev.spokeonline.com/wp-json/wp/v2/posts";
  /** WordPress REST API URL for Posts. */
  public static POSTS_URL = WordPress.WORDPRESS_URL + "posts/";
  /** WordPress REST API URL for Categories. */
  public static CATEGORIES_URL = WordPress.WORDPRESS_URL + "categories";
  
  // path to fetch the featured image of a post when the WP website is not using the 'Best REST API Featured Images' plugin
  // public static IMAGE_URL = WordPress.POSTS_URL + "posts._embedded" + "['wp:featuredmedia'][0].source_url";
    
  constructor(private http: Http) { }
  
  // TODO: (Phase 1 )I did this only for design purposes, since I couldnt find a better way to arrange posts through ngFor
  /**
   * Gets the latest post. In the HTML it's the largest one displayed on top of the TOP STORIES page. 
   */
  getCoverHighlight() {   
    return this.http.get(WordPress.POSTS_URL + `?_embed&per_page=1&offset=3`)
    .map(response => response.json() as any[]);    
  }
  
  // TODO: (Phase 1 )I did this only for design purposes, since I couldnt find a better way to arrange posts through ngFor
  /** Gets posts number 2 and 3 from the latest posts. */
  getCoverRowOne() {   
    return this.http.get(WordPress.POSTS_URL + `?_embed&per_page=2&offset=5`)
    .map(response => response.json() as any[]);
  }  
  
  // TODO: (Phase 1 )I did this only for design purposes, since I couldnt find a better way to arrange posts through ngFor
  /** Gets posts number 4 and 5 from the latest posts. */
  getCoverRowTwo() { 
    return this.http.get(WordPress.POSTS_URL + `?_embed&per_page=2&offset=7`)
    .map(response => response.json() as any[]);
  }

  /** Retrieves a Post from WordPress given an id. */
  getPost(id) {      
    return this.http.get(WordPress.POSTS_URL + `${id}`)
    .map((response: Response) => response.json());
  }
 
  /** Retrieves all Categories from WordPress. */
  getCategories() {
    return this.http.get(WordPress.CATEGORIES_URL)
    .map((response: Response) => response.json());
  }

  /** Retrieves all Categories with respective first page of Posts */
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

  /** Get all Posts for a specific Category. OffSet controls the position among all existing Posts. 
   *  Offset is initialy set to 0 and it will be increased when loading more pages.
  */
  getCategoryPosts(id, offset, per_page) { 
    return this.http.get(WordPress.POSTS_URL + `?_embed&categories=${id}&per_page=${per_page}&offset=${offset}`)
      .map((response: Response) => response.json() as any[]);
  }

  /** Get all Posts related to a Category. */
  getRelatedPosts(catId){
    return this.http.get(WordPress.POSTS_URL + `?_embed&categories=${catId}&per_page=3`)
      .map((response: Response) => response.json() as any[]);
  }
  
  /** Retrieve Posts for some ids. */
  getPostsForIds(ids) {   
    return this.http.get(WordPress.POSTS_URL + `?include=` + ids.toString())
    .map(response => response.json() as any[]);
  }    
  
  sharedpost(id){
    return this.http.get(WordPress.POSTS_URL + `${id}`).map((response: Response) => response.json());
  }
}

