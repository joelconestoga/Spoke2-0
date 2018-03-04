import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule, MdTooltipModule, MdButtonModule, MdDialogModule, MdMenuModule, MdIconModule, MdToolbarModule, MdProgressBarModule, MdProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EscapeHtmlPipe } from './_utils/keep-html.pipe';
import { HomePostComponent } from './home/home.post.component';
import { ScrollToModule } from 'ng2-scroll-to';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { UrlparamComponent } from './urlparam/urlparam.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


import 'hammerjs';
import { AppService } from './app.service';
export const appRoutingProviders: any[] = [
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomePostComponent,
    EscapeHtmlPipe,
    UrlparamComponent
  ],
  imports: [ScrollToModule.forRoot(),
    BrowserModule,CommonModule,FormsModule,HttpModule, RouterModule.forRoot([
      { path: '', component: HomeComponent }, // Home component is called on root URL
      { path: ':id', component: UrlparamComponent }
    ]), HttpModule, BrowserAnimationsModule, FormsModule,
        FlexLayoutModule, MdButtonModule, MdTooltipModule, MdDialogModule, MdMenuModule, MdIconModule, MdToolbarModule, MdProgressBarModule, MdProgressSpinnerModule, MaterialModule, MDBBootstrapModule.forRoot(), AngularFontAwesomeModule, ShareButtonsModule.forRoot()
  ],
  
  providers: [AppService,appRoutingProviders],
  bootstrap: [AppComponent],
  entryComponents: [HomePostComponent],
  schemas: [ NO_ERRORS_SCHEMA ],  
})
export class AppModule { }