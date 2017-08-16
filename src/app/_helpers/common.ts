import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CommonService {
  private subject = new Subject<string>();
  constructor(private parentRouter: Router) { }
  goToTop() {
    window.scrollTo(0, 0);
  }
  sessionCheck(error) {
    if (error.status === 400) {
      this.parentRouter.navigate(['/login']);
    }
  }
  setAuthenticated(user: string) {
    this.subject.next(user);
  }

  clearAuthenticated() {
    this.subject.next();
  }

  getAuthenticated(): Observable<string> {
    return this.subject.asObservable();
  }
}
