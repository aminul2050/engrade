import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AlertService} from '../_services/index';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private alertService: AlertService) {
  }

  canActivate() {
    if (sessionStorage.getItem('authUser')) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page
    this.alertService.error('Please login first');
    this.router.navigate(['/login']);
    return false;
  }
}
