import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { UserMock } from '../providers/user/user.mock';
import { WordPressMock } from '../providers/wordpress/wordpress.mock';

describe('FavoritesComponent', () => {

  let component: FavoritesComponent;

  it('loadFavorites', () => {
  
    let favoriteKeys = { val: function() { return { 11: null, 333: null, 444: null }; } };
    let favoriteIds = ["11", "333", "444"];
    
    let userMock = new UserMock(favoriteKeys);
    let wordpressMock = new WordPressMock();

    component = new FavoritesComponent(wordpressMock, userMock, null, null, null);

    component.loadFavorites();

    expect(wordpressMock.getPostsForIds_getParams()).toEqual(favoriteIds);
  });

  it('loadPostsForIds', () => {
  
    let wordpressPosts = [ { 11: "Favorite 11" }, 
                           { 333: "Favorite 333" }, 
                           { 444: "Favorite 444" } ];
        
    let wordpressMock = new WordPressMock(wordpressPosts);

    component = new FavoritesComponent(wordpressMock, null, null, null, null);
    component.favorites = [];

    component.loadPostsForIds([]);

    let postsLoaded = [ { 11: "Favorite 11" }, 
                        { 333: "Favorite 333" }, 
                        { 444: "Favorite 444" } ];

    expect(component.favorites).toEqual([postsLoaded]);
  });


});
