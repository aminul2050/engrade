import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiService {
  private headers = new Headers();

  constructor() { }
  getUrl(url) {
    return environment.backendBaseUrl + '/engrade' + url;
  }
  getHeader(authToken) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('X-FORWARDED-FOR', '127.0.0.1');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('X-Auth-Token', authToken);
    return this.headers;
  }
}
