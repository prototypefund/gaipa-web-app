import {
  HttpClient,
  json
} from 'aurelia-http-client';
import {
  inject
} from 'aurelia-framework';


const TOKEN = 'ploneAuthToken';


@inject(HttpClient)
export class AuthService {
  constructor(http) {
    this.http = http;
    const baseUrl = __GAIPA_API__;
    http.configure(config => {
      config
        //.rejectErrorResponses()
        .withBaseUrl(baseUrl)
        .withHeader('Accept', 'application/json')
        .withHeader('Content-Type', 'application/json')
        //.withDefaults({
        //  headers: {
        //    'Accept': 'application/json',
        //    'Content-Type': 'application/json',
        //    'X-Requested-With': 'Fetch'
        //  }
        //})
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
    return this.http.post(
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
            TOKEN,
            tokenResult.content.token
          );
          console.log('got token from Plone :)');
        }
        return tokenResult;
      })
      .catch(error => {
        console.log('Error retrieving token');
      });
  }

  tokenInterceptor() {
    let self = this;
    return {
      request(request) {
        let token = self.getToken();
        if (token) {
          request.headers.append('authorization', `bearer ${token}`);
        }
        return request;
      }
    };
  }

  logOut() {
    window.localStorage.removeItem(TOKEN);
  }

  isLoggedIn() {
    let token = this.getToken();
    if (token) return true;
    return false;
  }

  getToken() {
    return window.localStorage.getItem(TOKEN);
  }

  getUser() {
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
