import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

const loginUrl = '/login';

@Injectable()
export class LoginService {
  public token: string;
  public currentUser;

  constructor(private http: Http) {
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    sessionStorage.removeItem('authUser');
  }
}
