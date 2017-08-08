import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {User} from '../_model/user';
import {HttpClient} from '@angular/common/http';
import { ApiService, LoginService, AlertService} from '../_services/index';
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
  private jsonPlayLoad;
  constructor(private _fb: FormBuilder,
              private http: HttpClient,
              private api: ApiService,
              private alertService: AlertService,
              private router: Router,
              private loginService: LoginService) {
    this.parentRouter = router;
  }

  ngOnInit() {
    // reset login status
    this.loginService.logout();
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
    if ( this.jsonPlayLoad ) {
      this.http
        .post(this.api.getUrl('/login'), JSON.parse(this.jsonPlayLoad), this.api.getHeader(''))
        .subscribe(
          data => {
            if ( data['statusCode'] === 200 ) {
              localStorage.setItem('token', data['resourceSet']['resources'][0]['token']);
              this.parentRouter.navigate(['/home']);
              console.log(data['resourceSet']['resources'][0]['token']);
            }
          },
          err => {
            this.alertService.error('Some thing Error');
          }
        );
    }
  }
  openFile(event) {
    const input = event.target;
    for (let index = 0; index < input.files.length; index++) {
      const reader = new FileReader();
      reader.onload = () => {
        this.jsonPlayLoad = reader.result;
      }
      reader.readAsText(input.files[index]);
    }
  }
}
