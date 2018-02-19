import { TestBed, async, fakeAsync } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
//mocking 
import { Injectable, Injector } from '@angular/core';
// import {async, fakeAsync, tick} from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { Mock } from 'protractor/built/driverProviders';
import { connect } from 'net';
import { Jsonp } from '@angular/http/src/http';


describe('AppComponent', () => {
  let service: AppService;
  let spy: any;
  let backend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule],
      declarations: [
        AppComponent
      ],
      providers: [ 
        AppService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory:  (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ] // useValue: userServiceStub } ]
    }).compileComponents();
    backend = TestBed.get(MockBackend);
    service = TestBed.get(AppService);
    //mocking
    // this.injector = Injector.create([
    //   {provide: ConnectionBackend, useClass: MockBackend},
    //   {provide: RequestOptions, useClass: BaseRequestOptions},
    //   Http,
    //   AppService,
    // ]);
    // this.AppService = this.injector.get(AppService);
    // this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    // this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    //this is for if you want yourcustom response from the service
    // let response = {result: "hello"};
    // backend.connections.subscribe(connection => {
    //   connection.mockRespond(new Response(<ResponseOptions>{
    //     body: JSON.stringify(response)
    //   }));
    // });
    // var appService = fixture.debugElement.injector.get(AppService);
    // Setup spy on the `getCategories` method
    
   // spy = spyOn(service, 'getCategories').and.returnValue(Promise.resolve(true)); //this is mocking
    
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    // // Setup spy on the `getCategories` method
    // spy = spyOn(service, 'getCategories').and.returnValue(Promise.resolve(true));
    expect(app.title).toEqual('app');
  }));

   it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app');
  })); 

  it('should attach message from service to component', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.message).toBe('fake service');
  }));
});