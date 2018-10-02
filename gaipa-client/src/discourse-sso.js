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
  constructor(authService, ...rest) {
    super(...rest);
    this.auth = authService;
    this.message = 'Hello world';
    this.secret = 'f#jfUQ^yw9a*X@3%#Kn5xF#0k';  // TODO, put this in the backend
    this.ssoDecoded = '';
  }

  activate(params) {
    // /discourse-sso?sso=bm9uY2U9M2ZkNGRkNzk0NjM5ZWRlODcyNjU3MjMxNzU5MTQzYzImcmV0dXJuX3Nzb191cmw9aHR0cCUzQSUyRiUyRmNvbW11bml0eS5nYWlwYS5vcmclMkZzZXNzaW9uJTJGc3NvX2xvZ2lu&sig=f8897d30843d82ca4429528a2bdc11cbdfef85295b5650cfb97e08cc13f9b972
    let sso = params.sso;
    let sig = params.sig;
    let ssoHash = sha256.hmac(this.secret, sso);

    if (ssoHash !== sig) {
      console.log('HMAC signature invalid!');
      this.eventAggregator.publish(
        'status-message', {message: 'HMAC signature invalid!', type: 'error'}
      );
    } else {
      this.user = this.auth.getUser();
      this.ssoDecoded = window.atob(sso);
      let ssoParams = new URLSearchParams(this.ssoDecoded);
      let nonce = ssoParams.get('nonce');
      let returnSsoUrl = ssoParams.get('return_sso_url');
      let ssoNewParams = new URLSearchParams('');
      ssoNewParams.append('name', this.user.fullname);
      ssoNewParams.append('external_id', this.user.sub);
      ssoNewParams.append('email', this.user.sub);
      ssoNewParams.append('username', this.user.sub);
      ssoNewParams.append('require_activation', false);
      ssoNewParams.append('nonce', nonce);
      this.ssoDecoded = ssoNewParams.toString();
      let ssoBase64 = window.btoa(this.ssoDecoded);
      let returnParamsString = encodeURI(ssoBase64);
      let newSig = sha256.hmac(this.secret, returnParamsString);
      let returnUrl = `${returnSsoUrl}?sso=${returnParamsString}&sig=${newSig}`;

      // redirect to community.gaipa.org SSO
      console.log('redirect to:' + returnUrl);
      window.location = returnUrl;
    }
  }
}
