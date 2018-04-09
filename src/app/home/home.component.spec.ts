import { HomeComponent } from './home.component';
import { TestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Injectable, Injector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Mock } from 'protractor/built/driverProviders';
import { connect } from 'net';
import { Jsonp } from '@angular/http/src/http';
import { EscapeHtmlPipe } from '../_utils/keep-html.pipe';
import { PostComponent } from '../post/post.component';
import { WordPress } from '../providers/wordpress/wordpress';
import { IWordPress } from '../providers/wordpress/i.wordpress';
import { WordPressMock } from '../providers/wordpress/wordpress.mock';

describe('HomeComponent', () => {
  
  let component: HomeComponent;

  it('loadCover', () => {
      
    let wordpressMock = new WordPressMock();
    
    wordpressMock.coverHighlight = [ { 11: "Highlight" } ];
    wordpressMock.coverRowOne = [ { 22: "RowOne 1" }, { 33: "RowOne 2" } ];
    wordpressMock.coverRowTwo = [ { 44: "RowTwo 1" }, { 55: "RowTwo 2" } ];
    
    component = new HomeComponent(wordpressMock, null, null, null);

    component.loadCover();

    expect(component.cover.highlight).toEqual([ { 11: "Highlight" } ]);
    expect(component.cover.rowOne).toEqual([ { 22: "RowOne 1" }, { 33: "RowOne 2" } ]);
    expect(component.cover.rowTwo).toEqual([ { 44: "RowTwo 1" }, { 55: "RowTwo 2" } ]);
  });
  
  it('loadCategoriesWithPosts', () => {
      
    let wordpressMock = new WordPressMock();
    
    wordpressMock.categoriesWithPosts = [ { id: 1001, posts: [1,2,3] },
                                          { id: 1002, posts: [2,3,4] },
                                          { id: 1003, posts: [5,6,7] }
                                        ];
    
    component = new HomeComponent(wordpressMock, null, null, null);

    component.loadCategoriesWithPosts();

    expect(component.categories).toEqual( [ { id: 1001, posts: [1,2,3] },
                                            { id: 1002, posts: [2,3,4] },
                                            { id: 1003, posts: [5,6,7] }
                                          ] );
  });

  it('loadMore', () => {

    let eventMock = { stopPropagation: function(){} };
    let categoryMock = { id: 123, offset: 3, posts: [], forward: true };

    let wordpressMock = new WordPressMock();
    wordpressMock.morePosts = [ { post: "Other post" }, { post: "Another one" } ];

    component = new HomeComponent(wordpressMock, null, null, null);

    component.loadMore(eventMock, categoryMock);

    expect(categoryMock.offset).toEqual(7);
    expect(categoryMock.posts).toEqual([ { post: "Other post" }, { post: "Another one" } ]);
    expect(categoryMock.forward).toEqual(false);
  });
  
  it('loadPrevious', () => {

    let eventMock = { stopPropagation: function(){} };
    let categoryMock = { id: 123, offset: 10, posts: [], forward: false };

    let wordpressMock = new WordPressMock();
    wordpressMock.morePosts = [ { post: "Other post" }, { post: "Another one" } ];

    component = new HomeComponent(wordpressMock, null, null, null);

    component.loadPrevious(eventMock, categoryMock);

    expect(categoryMock.offset).toEqual(6);
    expect(categoryMock.posts).toEqual([ { post: "Other post" }, { post: "Another one" } ]);
    expect(categoryMock.forward).toEqual(true);
  });
  
});
