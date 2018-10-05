import {
  HttpClient,
  json
} from 'aurelia-http-client';
import {
  inject
} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';


const TOKENNAME = 'ploneAuthToken';


@inject(HttpClient, EventAggregator, Router)
export class AuthService {
  constructor(httpClient, eventAggregator, router) {
    this.httpClient = httpClient;
    this.router = router;
    const baseUrl = __GAIPA_API__;
    this.eventAggregator = eventAggregator;
    httpClient.configure(config => {
      config
        //.rejectErrorResponses()
        .withBaseUrl(baseUrl)
        .withHeader('Accept', 'application/json')
        .withHeader('Content-Type', 'application/json')
        .withInterceptor({
          request(request) {
            //console.log(`Requesting ${request.method} ${request.url}`);
            return request;
          },
          response(response) {
            //console.log(`Received ${response.statusCode} ${response.statusText}`);
            return response;
          }
        });
    });
  }

  logIn(userName, password) {
    return this.httpClient.post(
      '@login',
      JSON.stringify({
        login: userName,
        password: password
      })
    )
      .then(response => response)
      .then(tokenResult => {
        if (tokenResult.isSuccess) {
          let token = tokenResult.content.token;
          this.storeToken(token);
        }
        return tokenResult;
      });
  }

  renewLogin() {
    console.log('Renew login');
    return this.httpClient.post(
      '@login-renew',
    )
      .then(response => response)
      .then(tokenResult => {
        if (tokenResult.isSuccess) {
          let token = tokenResult.content.token;
          this.storeToken(token);
        }
        return tokenResult;
      });
  }

  storeToken(token) {
    window.localStorage.setItem(
      TOKENNAME,
      token
    );
    setTimeout(() => {
      if (token) {
        if (this.decodeToken(token).exp * 1000 > new Date().getTime()) {
          this.renewLogin();
        } else {
          this.logOut();
          this.router.navigateToRoute('login');
        }
      }
    }, (this.decodeToken(token).exp * 1000 - new Date().getTime()) + 0.9);
  }

  tokenInterceptor() {
    let auth = this;
    return {
      request(request) {
        let token = auth.getToken();
        if (token) {
          request.headers.append('authorization', `bearer ${token}`);
        }
        return request;
      }
    };
  }

  logOut() {

    window.localStorage.removeItem(TOKENNAME);
  }

  isLoggedIn() {
    let token = this.getToken();
    if (token) return true;
    return false;
  }

  getToken() {
    let token = window.localStorage.getItem(TOKENNAME);
    return token;
  }

  getUser() {
    let token = this.decodeToken();
    return token;
  }

  decodeToken(token) {
    token = token || this.getToken();
    if (!token) return;
    try {
      let decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log(decodedToken.exp * 1000 - new Date().getTime());
      return decodedToken;
    } catch (e) {
      return undefined;
    }
  }
}
