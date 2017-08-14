import { Component, OnInit } from '@angular/core';
import {ApiService, AlertService} from '../_services/index';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions, Response} from '@angular/http';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
})
export class RunComponent {
  public message;
  private token = JSON.parse(sessionStorage.getItem('authUser'))['token'] || '';

  constructor(private http: HttpClient,
              private api: ApiService,
              private alertService: AlertService
              ) {  }
  runTask(event) {
    if ( this.token ) {
      this.http
        .get(this.api.getUrl('/run'), {
          headers: new HttpHeaders()
            .set('X-Auth-Token', this.token)
            .set('Access-Control-Allow-Origin', '*')
            .set('Content-type', 'application/json')
        })
        .subscribe(
          data => {
            if ( data['statusCode'] === 200 ) {
              this.alertService.success(data['message']);
            }
          },
          err => {
            if (err.error instanceof Error) {
              // A client-side or network error occurred. Handle it accordingly.
              console.log('An error occurred:', err.error.message);
              this.alertService.error('An error occurred:', err.error.message);
            } else {
              this.alertService.error(err.error.message);
            }
          }
        );
    } else {
      this.alertService.error('Session time out. Please login again');
    }
  }
}
