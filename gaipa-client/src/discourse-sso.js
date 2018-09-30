import { sha256 } from 'js-sha256';
import { BaseView } from "./base";
import {
  AuthService
} from './services/auth';
import {
  inject
} from 'aurelia-framework';


@inject(AuthService)
export class DiscourseSso extends BaseView {
  constructor(authService) {
    super();
    this.auth = authService;
    this.message = 'Hello world';
    this.secret = 'f#jfUQ^yw9a*X@3%#Kn5xF#0k';  // TODO, put this in the backend
    this.ssoDecoded = '';
  }

  activate(params) {
    let sso = params.sso;
    let sig = params.sig;
    let ssoHash = sha256.hmac(this.secret, sso);
    console.log(sig);
    console.log(ssoHash);

    if (ssoHash !== sig) {
      this.eventAggregator.publish(
        'status-message', {message: 'HMAC signature invalid!', type: 'error'}
      );
    } else {
      this.ssoDecoded = window.atob(sso);
      console.log(this.ssoDecoded);
      let ssoParams = new URLSearchParams(this.ssoDecoded);
      let nonce = ssoParams.get('nonce');
      let returnSsoUrl = ssoParams.get('return_sso_url');
      console.log(nonce);
      console.log(returnSsoUrl);
      this.user = this.auth.getUser();
      ssoParams.set('name', this.user.fullname);
      ssoParams.set('external_id', this.user.sub);
      ssoParams.set('email', this.user.sub);
      ssoParams.set('username', this.user.sub);
      ssoParams.delete('return_sso_url');
      this.ssoDecoded = ssoParams.toString();
      let ssoBase64 = window.btoa(this.ssoDecoded);
      console.log(ssoBase64);
      let returnParamsString = encodeURI(ssoBase64);
      console.log(returnParamsString);
      let returnUrl = `${returnSsoUrl}?${returnParamsString}`;

      // redirect to community.gaipa.org SSO
      console.log('redirect to:' + returnUrl);
      window.location = returnUrl;
    }
  }
}
