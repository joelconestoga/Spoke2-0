import { IWordPress } from "./i.wordpress";
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import 'rxjs/add/observable/of';
import { Observable } from "rxjs";

export class WordPressMock implements IWordPress {
   
   public ids: any;
   
   constructor(public posts: any = null) { }

   getCoverHighlight() {
      throw new Error("Method not implemented.");
   }
   getCoverRowOne() {
      throw new Error("Method not implemented.");
   }
   getCoverRowTwo() {
      throw new Error("Method not implemented.");
   }
   getPost(id: any) {
      throw new Error("Method not implemented.");
   }
   getCategories() {
      throw new Error("Method not implemented.");
   }
   getCategoriesWithPosts(per_page: any) {
      throw new Error("Method not implemented.");
   }
   getCategoryPosts(id: any, offset: any, per_page: any) {
      throw new Error("Method not implemented.");
   }
   getRelatedPosts(catId: any) {
      throw new Error("Method not implemented.");
   }
   getPostsForIds(ids: any) {
      this.ids = ids;
      return this.posts == null ? new EmptyObservable() : Observable.of(this.posts);;
   }
   getPostsForIds_getParams() {
      return this.ids;
   }
   sharedpost(id: any) {
      throw new Error("Method not implemented.");
   }
}
