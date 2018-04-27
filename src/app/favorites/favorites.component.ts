import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../providers/user/user';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialogRef, MdDialog } from '@angular/material';
import { PostComponent } from '../post/post.component';
import { WordPress } from '../providers/wordpress/wordpress';
import { Router } from '@angular/router';
import { IWordPress } from '../providers/wordpress/i.wordpress';
import { IUser } from '../providers/user/i.user';

/**
 * This class has all the logic behind the Favourites page.
 */
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {

  /** List of Favourites. */
  public favorites: any[];

  constructor(@Inject('WordPress') public wordpress: IWordPress, 
              @Inject('User') public user: IUser, 
              private sanitizer: DomSanitizer, 
              private dialog: MdDialog, 
              private router: Router) {}

  //** Loads the user's Favourites on initialization. */
  ngOnInit() {
    this.loadFavorites();
  }

  /** 
   * First check if the user is logged in. Then retrieves the user's favourites ids from Firebase.
   * Finally, retrieve the posts from WordPress by using the obtained ids.
   */
  loadFavorites() {
    this.favorites = [];
    var self = this;

    var favoritesCallback = function(snapshot) {
      if (snapshot.val()) {
        var keys = Object.keys(snapshot.val());
        self.loadPostsForIds(keys);      
      }
    }
    
    var checkUserSessionCallback = function(isLoggedIn, email = "") {
      if (isLoggedIn) {
        self.user.getFavoritesKeys(favoritesCallback);            
      } else {
        self.router.navigate(['/']);
      }
    }

    this.user.checkUserSession(checkUserSessionCallback);    
  }

  /**
   * Request real posts from WordPress by passing the ids.
   * Keep the Favourites in rows of 4.
   * @param keys 
   */
  loadPostsForIds(keys) {
    var self = this;
    this.wordpress.getPostsForIds(keys).subscribe(data => { 
      var row = [];
      for (let i = 0; i < data.length; i++) {
        if (i % 4 == 0 && i > 0) {
          self.favorites.push(row);
          row = [];
          row.push(data[i]);        
        } else {
          row.push(data[i]);        
        }
      }
      if (row.length > 0) {
        self.favorites.push(row);
      }
    });      
  }

  /**
   * Get the image for a post.
   * @param image 
   */
  getBackground(image) { 
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  /**
   * Open the dialog that shows all the details of a Post.
   * @param id 
   * @param title 
   * @param catId 
   */
  openPost(id, title, catId){ 
    let dialogRef:MdDialogRef<PostComponent> = this.dialog.open(PostComponent);
    dialogRef.componentInstance.initialize(id, catId, title);
    dialogRef.afterClosed().subscribe(result => {
      if (dialogRef.componentInstance.wasChanged) {
        this.loadFavorites();
      }
    });
  }

}
