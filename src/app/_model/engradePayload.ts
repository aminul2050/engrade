export class EngradePayload {
  customSchoolId: string;
  customSchoolName: string;
  customDistrictId: string;
  customDistrictName: string;
  contextId: string;
  contextTitle: string;
  contextLabel: string;
  ltiMessageType: string;
  ltiVersion: string;
  userId: string;
  roles: string;
  lisPersonNameFull: string;
  lisPersonNameGiven: string;
  lisPersonNameFamily: string;
  lisPersonContactEmailPrimary: string;
  launchPresentationLocale: string;
  customAppsesid: string;
  resourceLinkId: string;
  lisOutcomeServiceUrl: string;
  oauthVersion: string;
  oauthNonce: string;
  oauthTimestamp: string;
  oauthConsumerKey: string;
  oauthSignatureMethod: string;
  oauthCallback: string;
  oauthSignature: string;
  constructor(customSchoolId: string, customSchoolName: string,
              customDistrictId: string, customDistrictName: string,
              contextId: string, contextTitle: string, contextLabel: string,
              ltiMessageType: string, ltiVersion: string, userId: string,
              roles: string, lisPersonNameFull: string, lisPersonNameGiven: string,
              lisPersonNameFamily: string, lisPersonContactEmailPrimary: string,
              launchPresentationLocale: string, customAppsesid: string, resourceLinkId: string,
              lisOutcomeServiceUrl: string, oauthVersion: string, oauthNonce: string,
              oauthTimestamp: string, oauthConsumerKey: string, oauthSignatureMethod: string,
              oauthCallback: string, oauthSignature: string) {
  this.customSchoolId = customSchoolId;
  this.customSchoolName = customSchoolName;
  this.customDistrictId = customDistrictId;
  this.customDistrictName = customDistrictName;
  this.contextId = contextId;
  this.contextTitle = contextTitle;
  this.contextLabel = contextLabel;
  this.ltiMessageType = ltiMessageType;
  this.ltiVersion = ltiVersion;
  this.userId = userId;
  this.roles = roles;
  this.lisPersonNameFull = lisPersonNameFull;
  this.lisPersonNameGiven = lisPersonNameGiven;
  this.lisPersonNameFamily = lisPersonNameFamily;
  this.lisPersonContactEmailPrimary = lisPersonContactEmailPrimary;
  this.launchPresentationLocale = launchPresentationLocale;
  this.customAppsesid = customAppsesid;
  this.resourceLinkId = resourceLinkId;
  this.lisOutcomeServiceUrl = lisOutcomeServiceUrl;
  this.oauthVersion = oauthVersion;
  this.oauthNonce = oauthNonce;
  this.oauthTimestamp = oauthTimestamp;
  this.oauthConsumerKey = oauthConsumerKey;
  this.oauthSignatureMethod = oauthSignatureMethod;
  this.oauthCallback = oauthCallback;
  this.oauthSignature = oauthSignature;
  }
}
