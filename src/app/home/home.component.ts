import { Component, OnInit } from '@angular/core';
import {ApiService, AlertService} from '../_services/index';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions, Response} from '@angular/http';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  private token = localStorage.getItem('token') || '';
  public taskList;
  public settings;
  public source: LocalDataSource;

  constructor(private http: HttpClient,
              private api: ApiService,
              private alertService: AlertService,
              private datePipe: DatePipe
            ) {
    this.source = new LocalDataSource();
  }

  ngOnInit(): void {
    this.settings = {
      columns: {
        taskId: {
          title: 'taskId',
          filter: false
        },
        taskState: {
          title: 'taskState',
          filter: false
        },
        startDate: {
          title: 'startDate',
          filter: false,
          valuePrepareFunction: (date) => {
            const raw = new Date(date);
            const formatted = this.datePipe.transform(raw, 'HH:MM:ss a dd MMM yyyy');
            return formatted;
          }
        }
      },
      pager: {
        display: true,
        perPage: 5
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
        position: 'right'
      }
    };
    console.log(this.token);
    if ( this.token ) {
      this.http
        .get(this.api.getUrl('/getPage'), {
          headers: new HttpHeaders()
            .set('X-Auth-Token', this.token)
            .set('Access-Control-Allow-Origin', '*')
            .set('Content-type', 'application/json')
        })
        .subscribe(
          data => {
            if ( data['statusCode'] === 200 ) {
              this.taskList = data['resourceSet']['resources'];
              this.source = new LocalDataSource(this.taskList);
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

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'taskId',
        search: query
      },
      {
        field: 'taskState',
        search: query
      },
      {
        field: 'startDate',
        search: query
      },
    ], false);
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
