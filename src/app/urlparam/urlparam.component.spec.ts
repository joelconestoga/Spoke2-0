import { TestBed, async, fakeAsync,ComponentFixture } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Injectable, Injector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Mock } from 'protractor/built/driverProviders';
import { connect } from 'net';
import { Jsonp } from '@angular/http/src/http';
import { UrlparamComponent } from './urlparam.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('UrlparamComponent', () => {
  let component: UrlparamComponent;
  let fixture: ComponentFixture<UrlparamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlparamComponent ],
      providers: [ 
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory:  (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    })
    .compileComponents();
  //  backend = TestBed.get(MockBackend);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlparamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*   it('should be created', () => {
    const fixture = TestBed.createComponent(UrlparamComponent);
    const app = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }); */
});
