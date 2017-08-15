import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {EngradePayload} from '../_model/engradePayload';

@Injectable()
export class LoginService {
  constructor(private http: Http) { }
  login(model: EngradePayload) {
    const modelData = this.makeJson(model);
    return this.http.post('/login', modelData)
      .map((response: Response) => {
        let user = response.json()['resourceSet']['resources'][0];
        if (user && user.token) {
          sessionStorage.setItem('authUser', JSON.stringify(user));
        }
        return user;
      });
  }

  logout() {
    sessionStorage.removeItem('authUser');
  }

  private makeJson(engradePayLoad) {
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
