import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  constructor() { }
  goToTop() {
    window.scrollTo(0, 0);
  }
}
