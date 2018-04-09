import { IWordPress } from "./i.wordpress";
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import 'rxjs/add/observable/of';
import { Observable } from "rxjs";

export class WordPressMock implements IWordPress {
   
   coverHighlight: any;
   coverRowOne: any;
   coverRowTwo: any;
   categoriesWithPosts: any;
   morePosts: any;
   relatedPostsMock: any;

   public ids: any;
   
   constructor(public posts: any = null) { }

   getCoverHighlight() {
      return Observable.of(this.coverHighlight);
   }
   getCoverRowOne() {
      return Observable.of(this.coverRowOne);
   }
   getCoverRowTwo() {
      return Observable.of(this.coverRowTwo);
   }
   getPost(id: any) {
      return Observable.of(this.posts[id]);
   }
   getCategories() {
      throw new Error("Method not implemented.");
   }
   getCategoriesWithPosts(per_page: any) {
      return Observable.of(this.categoriesWithPosts);
   }
   getCategoryPosts(id: any, offset: any, per_page: any) {
      return Observable.of(this.morePosts);
   }
   getRelatedPosts(catId: any) {
      return Observable.of(this.relatedPostsMock);
   }
   getPostsForIds(ids: any) {
      this.ids = ids;
      return this.posts == null ? new EmptyObservable() : Observable.of(this.posts);
   }
   getPostsForIds_getParams() {
      return this.ids;
   }
   sharedpost(id: any) {
      throw new Error("Method not implemented.");
   }
}
