import { Component, OnInit } from '@angular/core';
import {ApiService} from '../_services/index';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions, Response} from '@angular/http';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
})
export class RunComponent {
  public message;
  private token = localStorage.getItem('token') || '';

  constructor(private http: HttpClient, private api: ApiService) {
  }
  runTask(event) {
    if ( this.token ) {
      this.http
        .post(this.api.getUrl('1/run'), null, {
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
              this.message = 'Successfully Run';
            }
          },
          err => {
            alert('Something went wrong!');
          }
        );
    } else {
      console.log('Session time out. Please login again');
    }
  }
}
