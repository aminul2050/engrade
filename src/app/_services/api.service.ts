import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8080/backend/engrade';
  private headers = new Headers();

  constructor() { }
  getUrl(url) {
    return this.baseUrl + '/' + url;
  }
  getHeader(authToken) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('X-FORWARDED-FOR', '127.0.0.1');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('X-Auth-Token', authToken);
    return this.headers;
  }
}
