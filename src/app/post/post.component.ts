import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { User } from '../providers/user/user';
import { Router } from '@angular/router';
import { WordPress } from '../providers/wordpress/wordpress';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { DialogsService } from '../providers/services/dialogs.service';
import { AppComponent } from '../app.component';
import { IWordPress } from '../providers/wordpress/i.wordpress';
import { IUser } from '../providers/user/i.user';

/** Favourite icon. */
const FAVORITE: string = "favorite";
/** Non-Favourite icon. */
const NOT_FAVORITE: string = "favorite_border";

/**
 * This class is reponsible to present a Post details and its related articles.
 */
@Component({
  moduleId: module.id,
  selector: 'post-component',
  templateUrl: 'post.component.html'
})
export class PostComponent implements OnInit {
  /** @hidden*/
  loading: boolean = true;
  /** @hidden*/
  post;
  /** @hidden*/
  relatedPosts: any[];
  /** @hidden*/
  id;
  /** @hidden*/
  catId;
  /** @hidden*/
  title;
  /** @hidden*/
  linkToShare;
  /** @hidden*/
  linkForImage;
  /** @hidden*/
  modalLoad = false;
  /** @hidden*/
  fontSize = 16;
  /** @hidden*/
  favoriteIcon = NOT_FAVORITE;
  /** @hidden*/
  wasChanged: boolean = false;
  
  constructor(@Inject('WordPress') public wordpress: IWordPress, 
              @Inject('User') public user: IUser, 
              private dialogRef: MdDialogRef<PostComponent>, 
              private router: Router, 
              private sanitizer: DomSanitizer,
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

  /** Retrieve the actual Post from WordPress and refresh the Favourite icon for it. */
  loadPost(id) {
    this.wordpress.getPost(id).subscribe(data => {
      this.post = data;
      this.reloadFavoriteIcon(this.post.id);
    });
    this.linkToShare = AppComponent.APP_DOMAIN + id;
  }

  /* Function for Angular to sanitize background images from Wordpress */
  getBackground(image) { 
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  /** Loads related posts for the current one. */
  loadRelatedPost(catId) {
    this.wordpress.getRelatedPosts(catId).subscribe(data => {this.relatedPosts = data});
  }

  /** Increases the font size. */
  increaseFontSize(){
    this.fontSize = this.fontSize + 2;
  }

  /** Decreases the font size. */
  decreaseFontSize(){
    this.fontSize = this.fontSize - 2;
  }

  /** Toggle the Favourite icon. */
  setFavoriteIcon(isFavorite) {
    this.favoriteIcon = isFavorite ? FAVORITE : NOT_FAVORITE;
  }

  /** Refresh the Post's Favourite icon, as long as the user is logged in. */
  reloadFavoriteIcon(id) {
    if(!this.user.isLoggedIn()) {
      return;
    }
    var self = this;
    var callback = function(isFavorite) {
      self.setFavoriteIcon(isFavorite);
    }
    
    this.user.isFavorite(id, callback);        
  }

  /** Set or Remove a Post from user's Favourites. If the user is not logged in, open a confirmation and redirect to Login page. */
  setOrRemoveFromFavorites(post) {
    this.wasChanged = true;
    if(!this.user.isLoggedIn()) {
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

  /** Remove a Post from user's Favourites on Firebase. */
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
    this.user.removeFromFavorites(post.id, callback);
  }

  /** Add a Post to user's Favourites on Firebase. */
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

  /** Prevents multiple clicks while waiting for Firebase callback. */
  disableFavoriteButton() {
    this.favoriteIcon = "";
  }
}