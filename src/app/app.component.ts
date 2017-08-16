import { Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {CommonService} from './_helpers/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string;
  public user: string;
  private  subscription: Subscription;

  constructor(private commonService: CommonService) {
    this.subscription = this.commonService.getAuthenticated().subscribe(user => { this.user = user; });
    if ( !this.user && sessionStorage.getItem('authUser') ) {
      this.user = JSON.parse(sessionStorage.getItem('authUser'))['username'];
    }
  }

  ngOnInit(): void {
    this.title = 'Engrade';
  }
}
