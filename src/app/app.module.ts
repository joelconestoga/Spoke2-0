import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule, MdTooltipModule, MdButtonModule, MdDialogModule, MdMenuModule, MdIconModule, MdToolbarModule, MdProgressBarModule, MdProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EscapeHtmlPipe } from './_utils/keep-html.pipe';
import { ScrollToModule } from 'ng2-scroll-to';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ShareButtonsModule } from 'ngx-sharebuttons';
// import { UrlparamComponent } from './urlparam/urlparam.component';

import 'hammerjs';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AngularFireModule } from 'angularfire2';
import { AF } from './providers/af';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { PostComponent } from './post/post.component';

// FIREBASE config
export const firebaseConfig = {
  apiKey: 'AIzaSyB8ItaMdPPasjmcNLpjPJpgQNYGBXjRGek',
  authDomain: 'spoke-on-fire.firebaseapp.com',
  databaseURL: 'https://spoke-on-fire.firebaseio.com',
  storageBucket: 'spoke-on-fire.appspot.com',
  messagingSenderId: '282028460968'
};

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: ':id', component: UrlparamComponent }, // I don't know what is urlparam for, but it's preventing navigation to other pages
  { path: 'login', component: LoginComponent },  
  { path: 'registration', component: RegistrationComponent },  
  { path: 'favorites', component: FavoritesComponent },  
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    EscapeHtmlPipe,
    // UrlparamComponent,
    LoginComponent,
    RegistrationComponent,
    FavoritesComponent
  ],
  imports: [
    ScrollToModule.forRoot(),
    RouterModule.forRoot(routes), 
    BrowserModule, 
    HttpModule, 
    BrowserAnimationsModule, 
    FormsModule,
    FlexLayoutModule, 
    MdButtonModule, 
    MdTooltipModule, 
    MdDialogModule, 
    MdMenuModule, 
    MdIconModule, 
    MdToolbarModule, 
    MdProgressBarModule,
    MdProgressSpinnerModule, 
    MaterialModule, 
    MDBBootstrapModule.forRoot(), 
    AngularFontAwesomeModule, 
    ShareButtonsModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,    
  ],
  providers: [AF],
  bootstrap: [AppComponent],
  entryComponents: [PostComponent],
  schemas: [ NO_ERRORS_SCHEMA ],  
})
export class AppModule { }
