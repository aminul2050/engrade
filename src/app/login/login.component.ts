import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EngradePayload } from '../_model/engradePayload';
import { HttpClient } from '@angular/common/http';
import { ApiService, LoginService, AlertService } from '../_services/index';
import { Router } from '@angular/router';


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
      custom_schoolid: ['', <any>Validators.required],
      custom_school_name: ['', <any>Validators.required],
      customDistrictId: ['', <any>Validators.required],
      custom_district_name: ['', <any>Validators.required],
      context_id: ['', <any>Validators.required],
      context_title: ['', <any>Validators.required],
      context_label: ['', <any>Validators.required],
      lti_message_type: ['', <any>Validators.required],
      lti_version: ['', <any>Validators.required],
      user_id: ['', <any>Validators.required],
      roles: ['', <any>Validators.required],
      lis_person_name_full: ['', <any>Validators.required],
      lis_person_name_given: ['', <any>Validators.required],
      lis_person_name_family: ['', <any>Validators.required],
      lis_person_contact_email_primary: ['', <any>Validators.required],
      launch_presentation_locale: ['', <any>Validators.required],
      custom_appsesid: ['', <any>Validators.required],
      resource_link_id: ['', <any>Validators.required],
      lis_outcome_service_url: ['', <any>Validators.required],
      oauth_version: ['', <any>Validators.required],
      oauth_nonce: ['', <any>Validators.required],
      oauth_timestamp: ['', <any>Validators.required],
      oauth_consumer_key: ['', <any>Validators.required],
      oauth_signature_method: ['', <any>Validators.required],
      oauth_callback: ['', <any>Validators.required],
      oauth_signature: ['', <any>Validators.required]
    });
    this.subcribeToFormChanges();
  }
  subcribeToFormChanges() {
    const myFormStatusChanges$ = this.myForm.statusChanges;
    const myFormValueChanges$ = this.myForm.valueChanges;
  }
  save(model: EngradePayload, isValid: boolean) {
    this.submitted = true;
   /* if ( model.custom_school_name ) {
      this.jsonPlayLoad = JSON.stringify(model);
    }
    this.alertService.error(model.custom_school_name);*/
    if ( this.jsonPlayLoad ) {
      this.http
        .post(this.api.getUrl('/login'), this.jsonPlayLoad, this.api.getHeader(''))
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
        this.jsonPlayLoad = JSON.parse(reader.result);
      }
      reader.readAsText(input.files[index]);
    }
  }
}
