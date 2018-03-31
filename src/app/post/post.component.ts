import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { User } from '../providers/user/user';
import { Router } from '@angular/router';
import { WordPress } from '../providers/wordpress/wordpress';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { DialogsService } from '../providers/services/dialogs.service';
import { AppComponent } from '../app.component';

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
  wasChanged: boolean = false;
  
  constructor( private wordpress: WordPress, private dialogRef: MdDialogRef<PostComponent>, 
    private user: User, private router: Router, private sanitizer: DomSanitizer,
    private dialogsService: DialogsService) {

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
    this.wordpress.getPost(id).subscribe(data => {
      this.post = data;
      this.reloadFavoriteIcon(this.post.id);
    });
    this.linkToShare = AppComponent.APP_DOMAIN + id;
  }

  // function for Angular to sanitize background images from Wordpress 
  getBackground(image) { 
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  loadRelatedPost(catId) {
    this.wordpress.getRelatedPosts(catId).subscribe(data => {this.relatedPosts = data});
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
    if(!this.user.isLoggedIn) {
      return;
    }
    var self = this;
    var callback = function(isFavorite) {
      self.setFavoriteIcon(isFavorite);
    }
    
    this.user.isFavorite(id, callback);        
  }

  setOrRemoveFromFavorites(post) {
    this.wasChanged = true;
    if(!this.user.isLoggedIn) {
      let self = this;
      this.dialogsService.confirm("Log In", "Saving favourites requires login.", "Login")
      .subscribe(function(ok) {
        if (ok) {
          self.dialogRef.close();
          self.router.navigate(['/login']);
        }
      });
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
    this.user.removeFromFavorites(this.post.id, callback);
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
    this.user.setFavorite(this.post, callback);
  }

  disableFavoriteButton() {
    this.favoriteIcon = "";
  }
}