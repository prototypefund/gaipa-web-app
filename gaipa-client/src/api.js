import 'whatwg-fetch';
import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';


@inject(HttpClient)
export class ContentApi {
  constructor(http) {
    this.http = http;
    const baseUrl = __GAIPA_API__;
    http.configure(config => {
      config
        .rejectErrorResponses()
        .withBaseUrl(baseUrl)
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
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
    return this.http.fetch(path)
      .then(response => response.json())
      .then(card => {
        return card;
      })
    ;
  }

  getArticle(path) {
    return this.http.fetch(path)
      .then(response => response.json())
      .then(solution => {
        return solution;
      });
  }

  getChapter(path) {
    return this.http.fetch(path)
      .then(response => response.json())
      .then(solution => {
        return solution;
      });
  }

  getService(path) {
    return this.http.fetch(path)
      .then(response => response.json())
      .then(service => {
        return service;
      })
    ;
  }
}
