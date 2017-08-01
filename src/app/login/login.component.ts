import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {User} from '../_model/user';
import {HttpClient} from '@angular/common/http';
import { ApiService } from '../_services/index';
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

  constructor(private _fb: FormBuilder, private http: HttpClient, private api: ApiService, private router: Router) {
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
      this.http
        .post(this.api.getUrl('login'), {username: model.username, password: model.password}, this.api.getHeader(''))
        .subscribe(
          data => {
            if ( data['statusCode'] === 200 ) {
              localStorage.setItem('token', data['resourceSet']['resources'][0]['token']);
              this.parentRouter.navigate(['/home']);
              console.log(data['resourceSet']['resources'][0]['token']);
            }
          },
          err => {
            console.log('Something went wrong!');
          }
        );
    }
  }
}
