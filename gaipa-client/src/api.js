import 'whatwg-fetch';
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import {
  AuthService
} from './services/auth';


@inject(HttpClient, AuthService)
export class ContentApi {
  constructor(httpFetch, authService) {
    this.httpFetch = httpFetch;
    this.authService = authService;
    // const baseUrl = __GAIPA_API__;
    httpFetch.configure(config => {
      config
        //.rejectErrorResponses()
        //.withBaseUrl(baseUrl)
        .withDefaults({
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`);
            this.loading = true;
            return request;
          },
          response(response) {
            console.log(`Received ${response.status} ${response.url}`);
            this.loading = false;
            return response;
          }
        })
        .withInterceptor(this.authService.tokenInterceptor());
    });
  }

  get(path) {
    return this.httpFetch.fetch('/app' + path)
      .then(response => response.json())
      .then(card => {
        return card;
      })
    ;
  }

  getCard(path) {
    return this.httpFetch.fetch('/app' + path)
      .then(response => response.json())
      .then(card => {
        return card;
      })
    ;
  }

  getArticle(path) {
    return this.httpFetch.fetch('/app' + path)
      .then(response => response.json())
      .then(solution => {
        return solution;
      });
  }

  getChapter(path) {
    return this.httpFetch.fetch('/app' + path)
      .then(response => response.json())
      .then(solution => {
        return solution;
      });
  }

  getService(path) {
    return this.httpFetch.fetch('/app' + path)
      .then(response => response.json())
      .then(service => {
        return service;
      })
    ;
  }

  search(path) {
    return this.httpFetch.fetch('/app' + path)
      .then(response => response.json())
      .then(service => {
        return service;
      })
    ;
  }

  //doLogin(login, password) {
  //  let path = '/@login';
  //  let loginData = {
  //    login: login,
  //    password: password
  //  };
  //  //this.http.baseUrl = this.http.baseUrl.replace('/app', '')
  //  this.http.fetch('http://localhost:7080/Plone/@login', {
  //    method: 'POST',
  //    body: JSON.stringify(loginData)
  //  })
  //    .then(response => response.json())
  //    .then(data => {
  //      console.log(data);
  //    });
  //  //return this.http.fetch(
  //  //  'http://localhost:7080/Plone' + path, {
  //  //    method: 'POST',
  //  //    body: JSON.stringify(loginData)
  //  //  }
  //  //)
  //  //  .then(response => response.json())
  //  //  .then(status => {
  //  //    return status;
  //  //  })
  //  //;
  //}

  getUserData(user) {
    return this.httpFetch.fetch(`/@users/${user.sub}`)
      .then(response => response.json())
      .then(userData => {
        return userData;
      })
    ;
  }
}
