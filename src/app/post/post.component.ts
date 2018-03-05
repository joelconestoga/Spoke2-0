import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { AF } from '../providers/af';
import { HomeService } from '../home/home.service';

const FAVORITE: string = "favorite";
const NOT_FAVORITE: string = "favorite_border";

@Component({
  moduleId: module.id,
  selector: 'post-component',
  providers: [HomeService],
  templateUrl: 'post.component.html'
})

export class PostComponent implements OnInit {
  loading: boolean = true;
  post;
  relatedPosts: any[];
  id;
  catId;
  title;
  linkToShare;
  modalLoad = false;
  fontSize = 16;
  favoriteIcon = NOT_FAVORITE;
  
  constructor( private service: HomeService, public dialogRef: MdDialogRef<PostComponent>, public afService: AF) {
    setTimeout(() => { this.modalLoad = true }, 1000);
  }

  initialize(postId, categoryId, title) {
    this.id = postId;
    this.catId = categoryId;
    this.title = title;
  }

  ngOnInit() {
    this.loadPost(this.id);
    this.loadRelatedPost(this.catId);
  }

  loadPost(id) {
    this.service.getPost(id).subscribe(data => {
      this.post = data;
      this.reloadFavoriteIcon(this.post.id);
    });
    this.linkToShare = this.service.website + id;
  }

  loadRelatedPost(catId) {
    this.service.getRelatedPosts(catId).subscribe(data => {this.relatedPosts = data});
  }

  increaseFontSize(){
    this.fontSize = this.fontSize + 2;
  }

  decreaseFontSize(){
    this.fontSize = this.fontSize - 2;
  }

  setFavoriteIcon(isFavorite) {
    this.favoriteIcon = isFavorite ? FAVORITE : NOT_FAVORITE;
  }

  reloadFavoriteIcon(id) {
    var self = this;
    var callback = function(isFavorite) {
      self.setFavoriteIcon(isFavorite);
    }
    
    this.afService.checkFavorite(id, callback);        
  }

  setOrRemoveFromFavorites(post) {    
    if (this.favoriteIcon == FAVORITE) {
      this.removeFromFavorites(post);
    } else {
      this.setAsFavorite(post);
    }
  }

  removeFromFavorites(post) {
    var self = this;
    var callback = function(error) {
      if (!error) {
        self.favoriteIcon = NOT_FAVORITE;    
      } else {
        self.favoriteIcon = FAVORITE;    
        console.log('Operation failed');
      }
    };
    this.disableFavoriteButton();
    this.afService.removeFromFavorites(this.post.id, callback);
  }

  setAsFavorite(post) {
    var self = this;
    var callback = function(error) {
      if (!error) {
        self.favoriteIcon = FAVORITE;    
      } else {
        self.favoriteIcon = NOT_FAVORITE;    
        console.log('Operation failed');
      }
    };
    this.disableFavoriteButton();
    this.afService.setFavorite(this.post, callback);
  }

  disableFavoriteButton() {
    this.favoriteIcon = "";
  }
}