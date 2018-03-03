import { Component, OnInit } from '@angular/core';
import { AF } from '../providers/af';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(public afService: AF) { }

  ngOnInit() {
  }

}
