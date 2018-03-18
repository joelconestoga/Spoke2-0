import { TestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { Injectable, Injector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Mock } from 'protractor/built/driverProviders';
import { Jsonp } from '@angular/http/src/http';
import { AnonymousSubject } from 'rxjs/Subject';
import { WordPress } from './wordpress';

describe('HomeService', () => {

  let service: WordPress;
  let spy: any;
  let backend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ 
        WordPress,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory:  (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions] 
    }]}).compileComponents();
    backend = TestBed.get(MockBackend);
    service = TestBed.get(WordPress);
  }));

  it('this must return me the getPost method', fakeAsync(() => {
    let response = [{
        
        "id": 454,
        "date": "2017-07-28T12:08:32",
        "date_gmt": "2017-07-28T16:08:32",
        "author": 123415931,
        "featured_media": 456,
        "comment_status": "open",
        "ping_status": "open",
        "sticky": false,
        "template": "",
        "format": "standard",
        "meta": [],
        "slug": "almost-time-for-a-major-pucker-factor-as-falcon-heavy-readies-for-launch",
        "categories": [
            5580
        ],
    }];
    backend.connections.subscribe(connection => { 
      connection.mockRespond(new Response(<ResponseOptions>{ 
        body: JSON.stringify(response)
      }));
    }); 
  service.sharedpost(5580).subscribe(result => {
      expect(result[0].id).toBe(454); 
      expect(result[0].slug).toContain("almost-time-for-a-major-pucker-factor-as-falcon-heavy-readies-for-launch");
    });
  }));

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

  it('this must return me the getData method', fakeAsync(() => {
    let response = [{
        
        "id": 454,
        "date": "2017-07-28T12:08:32",
        "date_gmt": "2017-07-28T16:08:32",
        "author": 123415931,
        "featured_media": 456,
        "comment_status": "open",
        "ping_status": "open",
        "sticky": false,
        "template": "",
        "format": "standard",
        "meta": [],
        "slug": "almost-time-for-a-major-pucker-factor-as-falcon-heavy-readies-for-launch",
        "categories": [
            5580
        ],
    }];
    backend.connections.subscribe(connection => { 
      connection.mockRespond(new Response(<ResponseOptions>{ 
        body: JSON.stringify(response)
      }));
    });
 
  service.getCategoryPosts(5580,0,4).subscribe(result => {
      expect(result[0].id).toBe(454); 
      expect(result[0].categories).toContain(5580);
    });
  }));

  it('this must return me the getRelatedPosts method', fakeAsync(() => {
    let response = [{
        
        "id": 454,
        "date": "2017-07-28T12:08:32",
        "date_gmt": "2017-07-28T16:08:32",
        "author": 123415931,
        "featured_media": 456,
        "comment_status": "open",
        "ping_status": "open",
        "sticky": false,
        "template": "",
        "format": "standard",
        "meta": [],
        "slug": "almost-time-for-a-major-pucker-factor-as-falcon-heavy-readies-for-launch",
        "categories": [
            5580
        ],
    }];
    backend.connections.subscribe(connection => { 
      connection.mockRespond(new Response(<ResponseOptions>{ 
        body: JSON.stringify(response)
      }));
    });
 
  service.getRelatedPosts(5580).subscribe(result => {
      expect(result[0].id).toBe(454); 
      expect(result[0].sticky).toBeFalsy(true);
    });
  }));

  it('this must return me the sharedpost method', fakeAsync(() => {
    let response = [{
        
        "id": 454,
        "date": "2017-07-28T12:08:32",
        "date_gmt": "2017-07-28T16:08:32",
        "author": 123415931,
        "featured_media": 456,
        "comment_status": "open",
        "ping_status": "open",
        "sticky": false,
        "template": "",
        "format": "standard",
        "meta": [],
        "slug": "almost-time-for-a-major-pucker-factor-as-falcon-heavy-readies-for-launch",
        "categories": [
            5580
        ],
    }];
    backend.connections.subscribe(connection => { 
      connection.mockRespond(new Response(<ResponseOptions>{ 
        body: JSON.stringify(response)
      }));
    }); 
  service.sharedpost(5580).subscribe(result => {
      expect(result[0].id).toBe(454); 
      expect(result[0].date).toBe("2017-07-28T12:08:32");
    });
  }));

});

