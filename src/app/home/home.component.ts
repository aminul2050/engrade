import { Component, OnInit } from '@angular/core';
import {ApiService} from '../_services/index';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions, Response} from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private token = localStorage.getItem('token') || '';

  constructor(private http: HttpClient, private api: ApiService) {
  }

  ngOnInit(): void {
    console.log(this.token);
    if ( this.token ) {
      this.http
        .post(this.api.getUrl('1/getPage'), null, {
          headers: new HttpHeaders()
            .set('Authorization', this.token)
            .set('X-Auth-Token', this.token)
            .set('Access-Control-Allow-Origin', '*')
            .set('itValue', '12.4.3.65')
            .set('Content-type', 'application/json')
        })
        .subscribe(
          data => {
            if ( data['statusCode'] === 200 ) {
              localStorage.setItem('token', data['resourceSet']['resources'][0]['token']);
              console.log(data['resourceSet']['resources'][0]['token']);
            }
          },
          err => {
            console.log('Something went wrong!');
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
