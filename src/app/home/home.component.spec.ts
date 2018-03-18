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

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: WordPress;
  let spy: any;
  let backend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule],
      declarations: [ HomeComponent, EscapeHtmlPipe],
      providers: [ 
        WordPress,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory:  (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions] 
    }]})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
