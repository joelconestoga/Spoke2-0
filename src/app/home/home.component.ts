import { Component, OnInit, ViewChild, HostBinding, HostListener } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from './home.service'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { HomePostComponent } from './home.post.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  category: any;
  imageUrl: any;
  // empty array to store initial data from all categories
  data: any[]; 
  contentLoad;
  forward;
  load: any = { per_page: 4 };
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
  }
}
