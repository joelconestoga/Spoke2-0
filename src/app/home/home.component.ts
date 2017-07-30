import { Component, OnInit, ViewChild, HostBinding, HostListener } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from './home.service'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { fadeInOutAnimation } from '../_animations/index';
import { HomePostComponent } from './home.post.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [HomeService],
  animations: [fadeInOutAnimation]
})
export class HomeComponent implements OnInit {
  @HostBinding('@fadeInOutAnimation') fadeInOutAnimation = true;
  @HostBinding('style.display') display = 'block';

  lineHeight;

  category: any;
  imageUrl: any;
  forward;
  backward = 0;
  contentLoad;
  load: any = { per_page: 4, offset: 0, more: 4 };
  cover = { highlight: [], rowOne: [], rowTwo: [] }; // Array which contains last published pots in the json form. // ** We still have to make it display the posts most viewed instead of the last posts published **
  post: any; // Variable related to when a single post is to be displayed  
  private mediaContentUrl = "http://spoketest.wordpress.com/wp-content/uploads/"; // Base link to fetch media content  

  constructor(private service: HomeService, private sanitizer: DomSanitizer, public dialog: MdDialog) {
    setTimeout(() => {
      this.contentLoad = 1;
    }, 500)
  }

  getBackground(image) { // function for Angular to sanitize background images from Wordpress 
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  getCover() {
      this.service.getCoverHighlight().subscribe(data => this.cover.highlight = data);
      this.service.getCoverRowOne().subscribe(data => this.cover.rowOne = data);
      this.service.getCoverRowTwo().subscribe(data => this.cover.rowTwo = data);
  }

  openPost(id, title) {
    this.service.getPostId(id);
    this.service.getPost().subscribe(data => this.post = data);
    this.openDialog(id, title);
  }

  openDialog(id, title){ 
    // let config = new MdDialogConfig();
    let dialogRef:MdDialogRef<HomePostComponent> = this.dialog.open(HomePostComponent, {disableClose:true});
    dialogRef.componentInstance.id = id;
    dialogRef.componentInstance.title = title;
  }

  getPostId(id) {
    this.service.getPostId(id);
  }

  getPost(){
    this.service.getPost().subscribe(data => this.post = data);
  }

  data: any[]; // empty array to store initial data from all categories
  getData(){
    this.service.getCategories(this.load.per_page).subscribe(data => { 
      this.data = data;
      this.category = this.data[1];
    });
  }

  // loadMore(id){
  //   this.service.getData(id, this.load.offset, this.load.more).subscribe(data => {
  //     this.backward = this.backward + 1;
  //     this.load.offset += this.load.more;
  //     this.category.posts.push(data);
  //   });
  // }

  loadMore(id){
    let offset = 4;
    this.service.updateCategoryPosts(id).subscribe(data => { 
      this.data = data;
    });
  }

  loadPrevious() {
    this.backward = this.backward - 1;
    // this.service.getData(this.category.id, this.category.offset, this.load.more).subscribe(data => {
    //   this.category.posts.push(data);
    //   this.category.offset += this.load.more;
    // });
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
  }
}
