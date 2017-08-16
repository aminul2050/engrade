import {Injectable} from '@angular/core';
import {ApiService, AlertService} from '../_services/index';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CommonService} from '../_helpers/common';
import {Router} from '@angular/router';

@Injectable()
export class ScriptRunService {
  private token;
  constructor(private http: HttpClient,
              private api: ApiService,
              private alertService: AlertService,
              private commonService: CommonService,
              private parentRouter: Router
  ) {}

  runScript() {
    this.token = JSON.parse(sessionStorage.getItem('authUser'))['token'] || '';
    return this.http.get(this.api.getUrl('/run'), {
      headers: new HttpHeaders()
        .set('X-Auth-Token', this.token)
        .set('Access-Control-Allow-Origin', '*')
        .set('Content-type', 'application/json')
    }).subscribe(
      data => {
        this.alertService.success(data['message']);
      },
      error => {
        this.commonService.sessionCheck(error);
        this.alertService.error(JSON.parse(error).message);
        this.commonService.goToTop();
      }
    );
  }
}
