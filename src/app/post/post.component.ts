import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { AF } from '../providers/af';
import { HomeService } from '../home/home.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

const FAVORITE: string = "favorite";
const NOT_FAVORITE: string = "favorite_border";

@Component({
  moduleId: module.id,
  selector: 'post-component',
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
  linkForImage;
  modalLoad = false;
  fontSize = 16;
  favoriteIcon = NOT_FAVORITE;
  
  constructor( private service: HomeService, private sanitizer: DomSanitizer, private dialogRef: MdDialogRef<PostComponent>, 
    private afService: AF, private router: Router) {
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

  // function for Angular to sanitize background images from Wordpress 
  getBackground(image) { 
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
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
    if(!this.afService.isLoggedIn) {
      return;
    }
    var self = this;
    var callback = function(isFavorite) {
      self.setFavoriteIcon(isFavorite);
    }
    
    this.afService.checkFavorite(id, callback);        
  }

  setOrRemoveFromFavorites(post) {
    if(!this.afService.isLoggedIn) {
      this.dialogRef.close();
      this.router.navigate(['/login']);
      return;
    }
    
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