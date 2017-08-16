import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class CommonService {
  constructor(private parentRouter: Router) { }
  goToTop() {
    window.scrollTo(0, 0);
  }
  sessionCheck(error) {
    if (error.status === 400) {
      this.parentRouter.navigate(['/login']);
    }
  }
}
