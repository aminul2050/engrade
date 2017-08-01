import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {User} from '../_model/user';
import {HttpClient} from '@angular/common/http';
import { ApiService, LoginService } from '../_services/index';
import {Router} from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public myForm: FormGroup;
  public submitted: boolean;
  private parentRouter;
  constructor(private _fb: FormBuilder, private http: HttpClient,
              private api: ApiService, private loginService: LoginService, private router: Router) {
    this.parentRouter = router;
  }

  ngOnInit() {
    this.myForm = this._fb.group({
      username: ['', <any>Validators.required],
      password: ['', <any>Validators.required]
    });
    this.subcribeToFormChanges();
  }
  subcribeToFormChanges() {
    const myFormStatusChanges$ = this.myForm.statusChanges;
    const myFormValueChanges$ = this.myForm.valueChanges;
  }
  save(model: User, isValid: boolean) {
    this.submitted = true;
    if ( isValid ) {
      this.loginService.login(model.username, model.password);
    }
  }
}
