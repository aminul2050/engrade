import { Component, OnInit } from '@angular/core';
import {ApiService, AlertService} from '../_services/index';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions, Response} from '@angular/http';
import {ScriptRunService} from '../_services/script-run.service';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
})
export class RunComponent {
  public message;

  constructor(private http: HttpClient,
              private api: ApiService,
              private alertService: AlertService,
              private scriptRunService: ScriptRunService) {  }
  runTask(event) {
    this.scriptRunService.runScript();
  }
}
