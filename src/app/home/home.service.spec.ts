import { TestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
// import { MaterialModule } from '@angular/material';
// import { RouterTestingModule } from '@angular/router/testing';
import { Injectable, Injector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HomeService } from './home.service';
//import { HomeComponent } from './home.component';
import { Mock } from 'protractor/built/driverProviders';
//import { connect } from 'net';
import { Jsonp } from '@angular/http/src/http';
import { AnonymousSubject } from 'rxjs/Subject';
//import { EscapeHtmlPipe } from '../_utils/keep-html.pipe';
//import { HomePostComponent } from './home.post.component';

describe('HomeService', () => {

  let service: HomeService;
  let spy: any;
  let backend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      //imports: [ MaterialModule],
      //declarations: [ HomeComponent, EscapeHtmlPipe ],
      providers: [ 
        HomeService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory:  (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions] 
    }]}).compileComponents();
    backend = TestBed.get(MockBackend);
    service = TestBed.get(HomeService);
  }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
it('this must return me the categories method', fakeAsync(() => {
    let response = [{
        "id": 5580,
        "count": 8,
        "description": "",
        "link": "https://spoketest.wordpress.com/category/diversions/",
        "name": "Diversions",
        "slug": "diversions",
        "taxonomy": "category",
        "parent": 0,
        "meta": [],
        "_links": {
            "self": [
                {
                    "href": "https://public-api.wordpress.com/wp/v2/sites/spoketest.wordpress.com/categories/5580"
                }
            ],
            "collection": [
                {
                    "href": "https://public-api.wordpress.com/wp/v2/sites/spoketest.wordpress.com/categories"
                }
            ],
            "about": [
                {
                    "href": "https://public-api.wordpress.com/wp/v2/sites/spoketest.wordpress.com/taxonomies/category"
                }
            ],
            "wp:post_type": [
                {
                    "href": "https://public-api.wordpress.com/wp/v2/sites/spoketest.wordpress.com/posts?categories=5580"
                }
            ],
            "curies": [
                {
                    "name": "wp",
                    "href": "https://api.w.org/{rel}",
                    "templated": true
                }
            ]
        }
    }];
  
    backend.connections.subscribe(connection => { 
      connection.mockRespond(new Response(<ResponseOptions>{ 
        body: JSON.stringify(response)
      }));
    });
 
  service.getCategoriesWithPosts(4).subscribe(result => {
      expect(result[0].id).toBe(5580); 
      expect(result[0].name).toBe("Diversions");
    });
 
  }));
});

