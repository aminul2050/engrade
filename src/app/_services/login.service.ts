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

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(environment.backendBaseUrl + loginUrl, {username: username, password: password}, null)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        this.token = response.json() && response.json().token;
        if (this.token) {
          // set token property
          this.token = this.token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: this.token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      })
      .catch ((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('token');
  }
}
