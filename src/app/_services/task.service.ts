import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../_model/page';
import {PagedData} from '../_model/paged-data';
import {Task} from '../_model/task';
import {ApiService, AlertService} from '../_services/index';
import {HttpClient, HttpHeaders} from '@angular/common/http';

/**
 * A server used to mock a paged data result from a server
 */
@Injectable()
export class TaskService {
  public pagedData;
  public taskList;
  private token = localStorage.getItem('token') || '';

  constructor(private http: HttpClient,
              private api: ApiService,
              private alertService: AlertService
  ) {}

  /**
   * A method that mocks a paged server response
   * @param page The selected page
   * @returns {any} An observable containing the employee data
   */
  public getResults(page: Page): Observable<PagedData<Task>> {
    return this.http.get(this.api.getUrl('/getPage?' + 'page=' + page.pageNumber + '&size=' + page.size + '&sort=' + page.sorting), {
      headers: new HttpHeaders()
        .set('X-Auth-Token', this.token)
        .set('Access-Control-Allow-Origin', '*')
        .set('Content-type', 'application/json')
    })
      .map((res: Response) => {
        if ( res['statusCode'] === 200 ) {
          this.pagedData = new PagedData<Task>();
          this.taskList = res['resourceSet']['resources'];
          page.totalElements = res['resourceSet']['totalRecords'];
          page.totalPages = Math.ceil(page.totalElements / page.size);
          const start = page.pageNumber * page.size;
          const end = Math.min((start + page.size), page.totalElements);
          for (let i = 0; i < ( end - start ); i++) {
            const jsonObj = this.taskList[i];
            const task = new Task(jsonObj.taskId, jsonObj.taskState, jsonObj.startDate);
            this.pagedData.data.push(task);
          }
          this.pagedData.page = page;
          return this.pagedData;
        } else {
          return null;
        }
      });
  }
}
