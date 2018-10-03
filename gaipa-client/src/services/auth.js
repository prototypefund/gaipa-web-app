import {
  HttpClient,
  json
} from 'aurelia-http-client';
import {
  inject
} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';


const TOKENNAME = 'ploneAuthToken';


@inject(HttpClient, EventAggregator)
export class AuthService {
  constructor(httpClient, eventAggregator) {
    this.httpClient = httpClient;
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
            console.log(`Requesting ${request.method} ${request.url}`);
            return request;
          },
          response(response) {
            console.log(`Received ${response.statusCode} ${response.statusText}`);
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
          window.localStorage.setItem(
            TOKENNAME,
            tokenResult.content.token
          );
        }
        return tokenResult;
      });
  }

  tokenInterceptor() {
    console.log('#### #### try to add authorization header...');
    let auth = this;
    return {
      request(request) {
        console.log('try to add authorization header...');
        let token = auth.getToken();
        if (token) {
          console.log('add authorization header...');
          request.headers.append('authorization', `bearer ${token}`);
        } else {
          console.log('no token found');
        }
        return request;
      }
    };
  }

  logOut() {
    console.log('logout');
    window.localStorage.removeItem(TOKENNAME);
  }

  isLoggedIn() {
    console.log('is logged in');
    let token = this.getToken();
    if (token) return true;
    return false;
  }

  getToken() {
    let token = window.localStorage.getItem(TOKENNAME);
    console.log('get token from local storage: ' + token);
    return token;
  }

  getUser() {
    console.log('get user');
    let token = this.decodeToken();
    return token;
  }

  decodeToken(token) {
    token = token || this.getToken();
    if (!token) return;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
}
