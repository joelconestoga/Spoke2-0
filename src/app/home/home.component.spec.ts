import { TestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Injectable, Injector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HomeService } from './home.service';
import { HomeComponent } from './home.component';
import { Mock } from 'protractor/built/driverProviders';
import { connect } from 'net';
import { Jsonp } from '@angular/http/src/http';
import { EscapeHtmlPipe } from '../_utils/keep-html.pipe';
import { HomePostComponent } from './home.post.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let comp:HomePostComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: HomeService;
  let spy: any;
  let backend: MockBackend;
  let fontSize:14;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule],
      declarations: [ HomeComponent, EscapeHtmlPipe ],
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

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', async(() => {
    // const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // this should be in the spec file of HomePostComponent not HomeCompoent got it? hmm
  // it('Increase Font Size By 2', async(() => {
    
  //   expect(comp.increaseFontSize()).toEqual('18'); //not able to call component method here
  // }));

  // it('Decrease Font Size By 2', async(()=> {
  //   expect(comp.decreaseFontSize()).toEqual('14'); //not able to call component method here
  // }));
});

