export interface EngradePayload {
  custom_schoolid: number;
  custom_school_name: string;
  custom_districtid: number;
  custom_district_name: string;
  context_id: number;
  context_title: string;
  context_label: string;
  lti_message_type: string;
  lti_version: string;
  user_id: number;
  roles: string;
  lis_person_name_full: string;
  lis_person_name_given: string;
  lis_person_name_family: string;
  lis_person_contact_email_primary: string;
  launch_presentation_locale: string;
  custom_appsesid: string;
  resource_link_id: number;
  lis_outcome_service_url: string;
  oauth_version: string;
  oauth_nonce: string;
  oauth_timestamp: number;
  oauth_consumer_key: string;
  oauth_signature_method: string;
  oauth_callback: string;
  oauth_signature: string;
}
