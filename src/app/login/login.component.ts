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
    this.loginService.logout();
    this.myForm = this._fb.group({
      customSchoolId: ['10000000000793519', <any>Validators.required],
      customSchoolName: ['Back Creek Valley Elementary', <any>Validators.required],
      customDistrictId: ['10000000000173777', <any>Validators.required],
      customDistrictName: ['004', <any>Validators.required],
      contextId: ['10000000000793519', <any>Validators.required],
      contextTitle: ['Back Creek Valley Elementary', <any>Validators.required],
      contextLabel: ['Back Creek Valley Elementary', <any>Validators.required],
      ltiMessageType: ['basic-lti-launch-request', <any>Validators.required],
      ltiVersion: ['LTI-1p0', <any>Validators.required],
      userId: ['10000000014552277', <any>Validators.required],
      roles: ['Administrator', <any>Validators.required],
      lisPersonNameFull: ['RC Test Admin', <any>Validators.required],
      lisPersonNameGiven: ['RC', <any>Validators.required],
      lisPersonNameFamily: ['Test Admin', <any>Validators.required],
      lisPersonContactEmailPrimary: ['elizabeth@engrade.com', <any>Validators.required],
      launchPresentationLocale: ['en-US', <any>Validators.required],
      customAppsesid: ['1499902077997434130GWYrAk93wbGCGeiaAiGZh08EaJ0dcg1110980063b297f', <any>Validators.required],
      resourceLinkId: ['10000000000793519', <any>Validators.required],
      lisOutcomeServiceUrl: ['https://api.engradepro.com/lti-outcomes/1p0/', <any>Validators.required],
      oauthVersion: ['1.0', <any>Validators.required],
      oauthNonce: ['ac2f225d8e52727322cac3444ae8d485', <any>Validators.required],
      oauthTimestamp: ['1499902127', <any>Validators.required],
      oauthConsumerKey: ['GHq1KP/4qOWl2KsFKl5TXw==', <any>Validators.required],
      oauthSignatureMethod: ['HMAC-SHA1', <any>Validators.required],
      oauthCallback: ['about:blank', <any>Validators.required],
      oauthSignature: ['intF0Xd6rqGqxcBAyaqxFBlJPuY=', <any>Validators.required]
    });
    this.subcribeToFormChanges();
  }
  subcribeToFormChanges() {
    const myFormStatusChanges$ = this.myForm.statusChanges;
    const myFormValueChanges$ = this.myForm.valueChanges;
  }
  save(model: EngradePayload, isValid: boolean) {
    this.submitted = true;
    const data = this.makeJson(model);
    if ( data ) {
      this.http
        .post(this.api.getUrl('/login'), data, this.api.getHeader(''))
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
        this.myForm = this._fb.group(this.loadForm(this.jsonPlayLoad));
      }
      reader.readAsText(input.files[index]);
    }
  }
  loadForm(json) {
    const engrade = {
      'customSchoolId': json['custom_schoolid'],
      'customSchoolName': json['custom_school_name'],
      'customDistrictId': json['custom_districtid'],
      'customDistrictName': json['custom_district_name'],
      'contextId': json['context_id'],
      'contextTitle': json['context_title'],
      'contextLabel': json['context_label'],
      'ltiMessageType': json['lti_message_type'],
      'ltiVersion': json['lti_version'],
      'userId': json['user_id'],
      'roles': json['roles'],
      'lisPersonNameFull': json['lis_person_name_full'],
      'lisPersonNameGiven': json['lis_person_name_given'],
      'lisPersonNameFamily': json['lis_person_name_family'],
      'lisPersonContactEmailPrimary': json['lis_person_contact_email_primary'],
      'launchPresentationLocale': json['launch_presentation_locale'],
      'customAppsesid': json['custom_appsesid'],
      'resourceLinkId': json['resource_link_id'],
      'lisOutcomeServiceUrl': json['lis_outcome_service_url'],
      'oauthVersion': json['oauth_version'],
      'oauthNonce': json['oauth_nonce'],
      'oauthTimestamp': json['oauth_timestamp'],
      'oauthConsumerKey': json['oauth_consumer_key'],
      'oauthSignatureMethod': json['oauth_signature_method'],
      'oauthCallback': json['oauth_callback'],
      'oauthSignature': json['oauth_signature'],
    };
    return engrade;
  }
  makeJson(engradePayLoad) {
    const json = {
      'custom_schoolid': engradePayLoad.customSchoolId,
      'custom_school_name': engradePayLoad.customSchoolName,
      'custom_districtid': engradePayLoad.customDistrictId,
      'custom_district_name': engradePayLoad.customDistrictName,
      'context_id': engradePayLoad.contextId,
      'context_title': engradePayLoad.contextTitle,
      'context_label': engradePayLoad.contextLabel,
      'lti_message_type': engradePayLoad.ltiMessageType,
      'lti_version': engradePayLoad.ltiVersion,
      'user_id': engradePayLoad.userId,
      'roles': engradePayLoad.roles,
      'lis_person_name_full': engradePayLoad.lisPersonNameFull,
      'lis_person_name_given': engradePayLoad.lisPersonNameGiven,
      'lis_person_name_family': engradePayLoad.lisPersonNameFamily,
      'lis_person_contact_email_primary': engradePayLoad.lisPersonContactEmailPrimary,
      'launch_presentation_locale': engradePayLoad.launchPresentationLocale,
      'custom_appsesid': engradePayLoad.customAppsesid,
      'resource_link_id': engradePayLoad.resourceLinkId,
      'lis_outcome_service_url': engradePayLoad.lisOutcomeServiceUrl,
      'oauth_version': engradePayLoad.oauthVersion,
      'oauth_nonce': engradePayLoad.oauthNonce,
      'oauth_timestamp': engradePayLoad.oauthTimestamp,
      'oauth_consumer_key': engradePayLoad.oauthConsumerKey,
      'oauth_signature_method': engradePayLoad.oauthSignatureMethod,
      'oauth_callback': engradePayLoad.oauthCallback,
      'oauth_signature': engradePayLoad.oauthSignature
    };
    return json;
  }
}
