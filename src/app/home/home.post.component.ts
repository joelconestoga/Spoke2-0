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
  id;
  title;
  linkToShare;
  
  constructor( private service: HomeService, public dialogRef: MdDialogRef<HomePostComponent>) { }
  
  openPost(id) {
    console.log(this.title);
    this.id = this.service.getPostId(id);
    this.service.getPost().subscribe(resData => this.post = resData);
    this.linkToShare = this.service.baseURL + id;
  }

  ngOnInit() {
    this.openPost(this.id);
  }
}