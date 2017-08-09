import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { HomeService } from './home.service';
import { Observable } from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'home-post-component',
  providers: [HomeService],
  templateUrl: 'home.post.component.html'
})
export class HomePostComponent implements OnInit {
  loading: boolean = true;
  post;
  relatedPosts: any[];
  id;
  catId;
  title;
  linkToShare;
  modalLoad = false;
  fontSize = 16;
  
  constructor( private service: HomeService, public dialogRef: MdDialogRef<HomePostComponent>) {
    setTimeout(() => {
        this.modalLoad = true;
    }, 1000)
  }
  
  openPost(id) {
    this.id = this.service.getPostId(id);    
    this.service.getPost().subscribe(data => this.post = data);
    this.linkToShare = this.service.website + id;
  }

  getRelatedPosts(catId) {
    this.catId = this.service.getCategoryId(catId);
    this.service.getRelatedPosts(catId).subscribe(data => {this.relatedPosts = data});
  }

  increaseFontSize(){
    this.fontSize = this.fontSize + 2;
  }

  decreaseFontSize(){
    this.fontSize = this.fontSize - 2;
  }

  ngOnInit() {
    this.openPost(this.id);
    this.getRelatedPosts(this.catId);
  }
}