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
  public column;
  public loading = false;



  constructor(private taskService: TaskService) {
    this.page = new Page();
    this.rows = new Array<Task>();
    this.columns = [
      { name: 'Task Id', sortable: true },
      { name: 'Task State', sortable: true },
      { name: 'Start Date', sortable: true }
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

  onSort(event) {
    const sort = event.sorts[0]['dir'];
    if ( event.sorts[0]['prop'] === 'taskId' ) {
      this.column = 'id';
    } else if ( event.sorts[0]['prop'] === 'taskState' ) {
      this.column = 'state';
    } else {
      this.column = event.sorts[0]['prop'];
    }
    this.page.sorting = this.column + ',' + sort;
    this.taskService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    this.page.filter = val;
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
