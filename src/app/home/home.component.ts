import { Component, OnInit, ViewChild, HostBinding, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { fadeInOutAnimation } from '../_animations/index';
import { PostComponent } from '../post/post.component';
import { isPlatformBrowser } from '@angular/common';
import { WordPress } from '../providers/wordpress/wordpress';
import { IWordPress } from '../providers/wordpress/i.wordpress';

/**
 * This class has all the logic behind the Home page. It loads all the Categories and Posts presented.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  // SPK_TODO: is this the only youtube video expected?
  /** YouTube URL. */
  public static YOUTUBE_URL = "https://www.youtube.com/embed/+lastest?list=LLa3gR-CwiJQz_o3m7AUVdjg";  

  /** @hidden*/
  categories: any[];
  /** How many posts should be loaded per page: 4 */
  load: any = { per_page: 4 };
  /** @hidden*/
  category: any;
  /** @hidden*/
  contentLoaded = true;
  /** Help the navigation arrows inside categories. */
  forward;
  /** Used to load YouTube URL safely. */
  safeYoutubeUrl: SafeResourceUrl;
  /** @hidden*/
  twitterHeight = 781;

  // SPK_TODO: ** We still have to make it display the posts most viewed instead of the last posts published **
  /** Array of last published posts in the json form. */
  cover = { highlight: [], rowOne: [], rowTwo: [] };

  // base link to fetch media content
  // private mediaContentUrl = "http://spoketest.wordpress.com/wp-content/uploads/";

  constructor(@Inject('WordPress') public wordpress: IWordPress, 
              @Inject(PLATFORM_ID) private platformId: Object,
              private sanitizer: DomSanitizer, 
              public dialog: MdDialog) { }

  /**
   * At the initialization, load all Categories with respective Posts.
   */
  ngOnInit() {
    this.loadCover();
    this.loadCategoriesWithPosts();
    this.loadYoutube();
  }
  
  /** Loads the Twitter. */
  ngAfterViewInit() {    
    this.loadTwitter();
    // this.t = document.getElementById('twitter-widget');
    // this.t.style.height = '1000';
  }

  /** Javascript specific for loading Twitter Widget. */
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

  /** Function for Angular to sanitize background images from Wordpress. */
  getBackground(image) { 
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  /** Loads the Cover, which is composed by the Highlight(big image) and the two rows of small images. */
  loadCover() {
      this.wordpress.getCoverHighlight().subscribe(data => this.cover.highlight = data);
      this.wordpress.getCoverRowOne().subscribe(data => this.cover.rowOne = data);
      this.wordpress.getCoverRowTwo().subscribe(data => this.cover.rowTwo = data);
  }

  /** Open a Dialog to present the details of a Post. */
  openPost(id, title, catId){ 
    let dialogRef:MdDialogRef<PostComponent> = this.dialog.open(PostComponent);
    dialogRef.componentInstance.initialize(id, catId, title);
  }
  
  /** Loads Categories with respective posts - 4 per page. */
  loadCategoriesWithPosts(){
    this.wordpress.getCategoriesWithPosts(this.load.per_page).subscribe(data => { 
      this.categories = data;
    });
  }

  /** Loads the YouTube video. */
  loadYoutube() {
    this.safeYoutubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(HomeComponent.YOUTUBE_URL);
  }

  /** Used by the arrows, to load next page of Posts for a specific Category. */
  loadMore(event, category){
    event.stopPropagation();
    this.wordpress.getCategoryPosts(category.id, category.offset, this.load.per_page).subscribe(data => {
      category.offset = data && data.length > 0 ? category.offset + this.load.per_page : category.offset;
      category.posts = data && data.length > 0 ? data : category.posts;
      category.forward = data && data.length === this.load.per_page;
    });
  }

  /** Used by the arrows, to load previous page of Posts for a specific Category. */
  loadPrevious(event, category) {
    event.stopPropagation();
    this.wordpress.getCategoryPosts(category.id, category.offset - (this.load.per_page * 2), this.load.per_page).subscribe(data => {
      category.offset -= this.load.per_page;
      category.posts = data && data.length > 0 ? data : category.posts;
      category.forward = true;
    });
  }

  /** Arrows support. */
  mouseEnter(name) {
    this.forward = name;
  }

  /** Arrows support. */
  mouseLeave(name) {
    this.forward = name;
  }
}
