import 'whatwg-fetch';
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';


@inject(HttpClient)
export class ContentApi {
  constructor(http) {
    this.http = http;
    const baseUrl = __GAIPA_API__;
    http.configure(config => {
      config
        //.rejectErrorResponses()
        //.withBaseUrl(baseUrl)
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
            console.log(`Received ${response.status} ${response.url}`);
            return response;
          }
        });
    });
  }

  getCard(path) {
    return this.http.fetch('/app' + path)
      .then(response => response.json())
      .then(card => {
        return card;
      })
    ;
  }

  getArticle(path) {
    return this.http.fetch('/app' + path)
      .then(response => response.json())
      .then(solution => {
        return solution;
      });
  }

  getChapter(path) {
    return this.http.fetch('/app' + path)
      .then(response => response.json())
      .then(solution => {
        return solution;
      });
  }

  getService(path) {
    return this.http.fetch('/app' + path)
      .then(response => response.json())
      .then(service => {
        return service;
      })
    ;
  }

  search(path) {
    return this.http.fetch('/app' + path)
      .then(response => response.json())
      .then(service => {
        return service;
      })
    ;
  }

  doLogin(login, password) {
    let path = '/@login';
    let loginData = {
      login: login,
      password: password
    };
    //this.http.baseUrl = this.http.baseUrl.replace('/app', '')
    this.http.fetch('http://localhost:7080/Plone/@login', {
      method: 'POST',
      body: JSON.stringify(loginData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
    //return this.http.fetch(
    //  'http://localhost:7080/Plone' + path, {
    //    method: 'POST',
    //    body: JSON.stringify(loginData)
    //  }
    //)
    //  .then(response => response.json())
    //  .then(status => {
    //    return status;
    //  })
    //;
  }
}
