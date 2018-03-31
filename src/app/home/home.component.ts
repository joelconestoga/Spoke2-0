import { Component, OnInit, ViewChild, HostBinding, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { fadeInOutAnimation } from '../_animations/index';
import { PostComponent } from '../post/post.component';
import { isPlatformBrowser } from '@angular/common';
import { WordPress } from '../providers/wordpress/wordpress';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  // SPK_TODO: is this the only youtube video expected?
  public static YOUTUBE_URL = "https://www.youtube.com/embed/+lastest?list=LLa3gR-CwiJQz_o3m7AUVdjg";  

  categories: any[];
  load: any = { per_page: 4 };
  category: any;
  contentLoaded = true;
  forward; // controller of navigation arrows inside categories  
  
  safeYoutubeUrl: SafeResourceUrl;
  twitterHeight = 781;

  // t: any;

  // array of last published posts in the json form. 
  // SPK_TODO: ** We still have to make it display the posts most viewed instead of the last posts published **
  cover = { highlight: [], rowOne: [], rowTwo: [] };

  // base link to fetch media content
  // private mediaContentUrl = "http://spoketest.wordpress.com/wp-content/uploads/";

  constructor(private wordpress: WordPress, private sanitizer: DomSanitizer, public dialog: MdDialog,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.loadCover();
    this.loadCategoriesWithPosts();
    this.loadYoutube();
  }
  
  ngAfterViewInit() {    
    this.loadTwitter();
    // this.t = document.getElementById('twitter-widget');
    // this.t.style.height = '1000';
  }

  loadTwitter() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(function() { 
        (<any>window).twttr = (function(d, s, id) {
          let js, fjs = d.getElementsByTagName(s)[0],
            t = (<any>window).twttr || {};
          if (d.getElementById(id)) return t;
          js = d.createElement(s);
          js.id = id;
          js.src = 'https://platform.twitter.com/widgets.js';
          fjs.parentNode.insertBefore(js, fjs);
    
          t._e = [];
          t.ready = function(f) {
            t._e.push(f);
          };
    
          return t;
        }(document, 'script', 'twitter-wjs'));
        (<any>window).twttr.widgets.load();
      }, 100);
    }
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   let h = event.target.innerWidth - 1000;
  //   this.t.attributes[1].value = h.toString();
  // }

  // function for Angular to sanitize background images from Wordpress 
  getBackground(image) { 
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  // method to subscribe to posts to be displayed in the cover section
  loadCover() {
      this.wordpress.getCoverHighlight().subscribe(data => this.cover.highlight = data);
      this.wordpress.getCoverRowOne().subscribe(data => this.cover.rowOne = data);
      this.wordpress.getCoverRowTwo().subscribe(data => this.cover.rowTwo = data);
  }

  openPost(id, title, catId){ 
    let dialogRef:MdDialogRef<PostComponent> = this.dialog.open(PostComponent);
    dialogRef.componentInstance.initialize(id, catId, title);
  }
  
  loadCategoriesWithPosts(){
    this.wordpress.getCategoriesWithPosts(this.load.per_page).subscribe(data => { 
      this.categories = data;
    });
  }

  loadYoutube() {
    this.safeYoutubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(HomeComponent.YOUTUBE_URL);
  }

  loadMore(event, category){
    event.stopPropagation();
    this.wordpress.getCategoryPosts(category.id, category.offset, this.load.per_page).subscribe(data => {
      category.offset = data && data.length > 0 ? category.offset + this.load.per_page : category.offset;
      category.posts = data && data.length > 0 ? data : category.posts;
      category.forward = data && data.length === this.load.per_page;
    });
  }

  loadPrevious(event, category) {
    event.stopPropagation();
    this.wordpress.getCategoryPosts(category.id, category.offset - (this.load.per_page * 2), this.load.per_page).subscribe(data => {
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
}
