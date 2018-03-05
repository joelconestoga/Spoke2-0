import { Component, OnInit } from '@angular/core';
import { AF } from '../providers/af';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeService } from '../home/home.service';
import { MdDialogRef, MdDialog } from '@angular/material';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {

  public favorites: any[];

  constructor(private service: HomeService, private afService: AF, private sanitizer: DomSanitizer, private dialog: MdDialog) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    var self = this;
    var callback = function(snapshot) {
      var keys = Object.keys(snapshot.val());
      self.loadPostsForIds(keys);      
    }
    
    this.afService.getFavoritesKeys(callback);            
  }

  loadPostsForIds(keys) {
    var self = this;
    this.service.getPostsForIds(keys).subscribe(data => { 
      self.favorites = data;
    });      
  }

  getBackground(image) { 
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  openPost(id, title, catId){ 
    let dialogRef:MdDialogRef<PostComponent> = this.dialog.open(PostComponent, {disableClose:true});
    dialogRef.componentInstance.initialize(id, catId, title);
    dialogRef.afterClosed().subscribe(result => {
      this.loadFavorites();
    });
  }

}
