import { Component, OnInit } from '@angular/core';
import { User } from '../providers/user/user';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialogRef, MdDialog } from '@angular/material';
import { PostComponent } from '../post/post.component';
import { WordPress } from '../providers/wordpress/wordpress';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {

  public favorites: any[];

  constructor(private wordpress: WordPress, public user: User, private sanitizer: DomSanitizer, 
    private dialog: MdDialog, private router: Router) {}

  ngOnInit() {
    this.loadFavorites();
  }

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
      // console.log(self.favorites);
    });      
  }

  getBackground(image) { 
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

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
