import { Component, OnInit } from '@angular/core';
import {TaskService} from '../_services/index';
import { DatePipe } from '@angular/common';
import {Page} from '../_model/page';
import {Task} from '../_model/task';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  public page;
  public rows;
  public columns;



  constructor(private taskService: TaskService) {
    this.page = new Page();
    this.rows = new Array<Task>();
    this.columns = [
      { prop: 'taskId' },
      { name: 'taskState' },
      { name: 'startDate' }
    ];
    this.page.pageNumber = 0;
    this.page.size = 5;
  }

  ngOnInit(): void {
    this.setPage({ offset: 0 });
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.taskService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
  }
  /*private authenticationToken(): RequestOptions {
    let login = JSON.parse(sessionStorage.getItem('currentLogin'));
    if (login && login.authenticationToken) {
      let headers = new Headers({
        'Authorization': 'Basic ' + login.authenticationToken,
        'Content-type': 'application/json',
      });
      return new RequestOptions({headers: headers});
    }
  }*/
}
