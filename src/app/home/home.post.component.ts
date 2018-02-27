import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { HomeService } from './home.service';
import { Observable } from 'rxjs/Rx';
import { AF } from '../providers/af';

const FAVORITE: string = "favorite";
const NOT_FAVORITE: string = "favorite_border";

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
  favoriteIcon = NOT_FAVORITE;
  
  constructor( private service: HomeService, public dialogRef: MdDialogRef<HomePostComponent>, public afService: AF) {
    setTimeout(() => { this.modalLoad = true }, 1000);
  }
  
  ngOnInit() {
    this.openPost(this.id);
    this.getRelatedPosts(this.catId);
  }

  openPost(id) {
    this.id = this.service.getPostId(id);    
    this.service.getPost().subscribe(data => {
      this.post = data;
      this.reloadFavoriteIcon(this.post.id);
    });
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
      this.setAsFavorite(post);
    } else {
      this.removeFromFavorites(post);
    }
  }

  setAsFavorite(post) {
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

  removeFromFavorites(post) {
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
    this.afService.setFavorite(this.post.id, callback);
  }

  disableFavoriteButton() {
    this.favoriteIcon = "";
  }
}