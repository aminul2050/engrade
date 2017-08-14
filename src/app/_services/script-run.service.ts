import {Injectable} from '@angular/core';
import {ApiService, AlertService} from '../_services/index';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ScriptRunService {
  private token = JSON.parse(sessionStorage.getItem('authUser'))['token'] || '';
  constructor(private http: HttpClient,
              private api: ApiService,
              private alertService: AlertService
  ) {}

  runScript() {
    return this.http.get(this.api.getUrl('/run'), {
      headers: new HttpHeaders()
        .set('X-Auth-Token', this.token)
        .set('Access-Control-Allow-Origin', '*')
        .set('Content-type', 'application/json')
    }).map((response: Response) => response.json());
  }
}
