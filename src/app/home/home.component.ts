import { Component, OnInit, ViewChild, HostBinding, HostListener } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from './home.service'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { HomePostComponent } from './home.post.component'
import { fadeInOutAnimation } from '../_animations/index';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  data: any[];
  load: any = { per_page: 4 };
  category: any;
  imageUrl: any;
  relatedPosts: any[];
  contentLoad = false;
  forward; // controller of navigation arrows inside categories  
  cover = { highlight: [], rowOne: [], rowTwo: [] }; // array which contains last published pots in the json form. // ** We still have to make it display the posts most viewed instead of the last posts published **
  post: any; // variable related to openPost
  private mediaContentUrl = "http://spoketest.wordpress.com/wp-content/uploads/"; // base link to fetch media content  

  constructor(private service: HomeService, private sanitizer: DomSanitizer, public dialog: MdDialog) {
  }

  // function for Angular to sanitize background images from Wordpress 
  getBackground(image) { 
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  // method to subscribe to posts to be displayed in the cover section
  getCover() {
      this.service.getCoverHighlight().subscribe(data => this.cover.highlight = data);
      this.service.getCoverRowOne().subscribe(data => this.cover.rowOne = data);
      this.service.getCoverRowTwo().subscribe(data => this.cover.rowTwo = data);
  }

  // method that grabs post id, post title, and category id, subscribes that to getPost service and passes variables to the openDialog method
  openPost(id, title, catId) {
    this.service.getPostId(id);    
    this.service.getPost().subscribe(data => this.post = data);
    this.service.catId;
    this.service.getRelatedPosts(id).subscribe(data => {this.relatedPosts = data});
    this.openDialog(id, title, catId);
  }

  // receives variables from openPost method and passes to the dialog component (home.post.component)
  openDialog(id, title, catId){ 
    let dialogRef:MdDialogRef<HomePostComponent> = this.dialog.open(HomePostComponent, {disableClose:true});
    dialogRef.componentInstance.id = id;
    dialogRef.componentInstance.catId = catId;
    dialogRef.componentInstance.title = title;
  }

  getPostId(id) {
    this.service.getPostId(id);
  }

  getPost(){
    this.service.getPost().subscribe(data => this.post = data);
  }

  
  getData(){
    this.service.getCategories(this.load.per_page).subscribe(data => { 
      this.data = data;
    });
  }

  loadMore(event, category){
    event.stopPropagation();
    this.service.getData(category.id, category.offset, this.load.per_page).subscribe(data => {
      category.offset = data && data.length > 0 ? category.offset + this.load.per_page : category.offset;
      category.posts = data && data.length > 0 ? data : category.posts;
      category.forward = data && data.length === this.load.per_page;
    });
  }

  loadPrevious(event, category) {
    event.stopPropagation();
    this.service.getData(category.id, category.offset - (this.load.per_page * 2), this.load.per_page).subscribe(data => {
      category.offset -= this.load.per_page;
      category.posts = data && data.length > 0 ? data : category.posts;
      category.forward = true;
    });
  }

  mouseEnter(name) {
    this.forward = name;
  }

  mouseLeave(name) {
    this.forward = name;
  }

  ngOnInit() {
    this.getCover();
    this.getData();
    setTimeout(() => {
        this.contentLoad = true;
        (<any>window).twttr = (function (d, s, id) {
            let js: any, fjs = d.getElementsByTagName(s)[0],
                t = (<any>window).twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];
            t.ready = function (f: any) {
                t._e.push(f);
            };
            return t;
        }(document, "script", "twitter-wjs"));
    }, 1500)
  }
}
