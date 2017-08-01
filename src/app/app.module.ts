import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {JsonpModule, Jsonp, Response} from '@angular/http';

import { AlertComponent } from './_directives/index';

import { AlertService, ApiService } from './_services/index';

import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    JsonpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ])
  ],
  providers: [
    AlertService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
