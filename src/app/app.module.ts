import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AuthGuard } from './_guards/index';
import { AlertService, ApiService, LoginService } from './_services/index';

import { AlertComponent } from './_directives/index';
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RunComponent} from './run/run.component';
import { DatePipe } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {TaskService} from './_services/task.service';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    HomeComponent,
    RunComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    HttpModule,
    NgxDatatableModule,
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
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'run',
        component: RunComponent,
        canActivate: [AuthGuard]
      }
    ])
  ],
  providers: [
    AuthGuard,
    AlertService,
    ApiService,
    LoginService,
    TaskService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
