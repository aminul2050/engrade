import { Component, OnInit } from '@angular/core';
import {ApiService, AlertService} from '../_services/index';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions, Response} from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private token = localStorage.getItem('token') || '';
  public taskList;

  constructor(private http: HttpClient,
              private api: ApiService,
              private alertService: AlertService
            ) {  }

  ngOnInit(): void {
    console.log(this.token);
    if ( this.token ) {
      this.http
        .post(this.api.getUrl('/1/getPage'), null, {
          headers: new HttpHeaders()
            .set('X-Auth-Token', this.token)
            .set('Access-Control-Allow-Origin', '*')
            .set('Content-type', 'application/json')
        })
        .subscribe(
          data => {
            if ( data['statusCode'] === 200 ) {
              this.taskList = data['resourceSet']['resources'];
              console.log(data);
            }
          },
          err => {
            this.alertService.error('Something went wrong!');
          }
        );
    } else {
      console.log('Session time out. Please login again');
    }
  }
  /*private authenticationToken(): RequestOptions {
    let login = JSON.parse(sessionStorage.getItem('currentLogin'));
    if (login && login.authenticationToken) {
      let headers = new Headers({
        'Authorization': 'Basic ' + login.authenticationToken,
        'Content-type': 'application/json',
      });
      return new RequestOptions({headers: headers});
    }
  }*/
}
