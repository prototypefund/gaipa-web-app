import { HttpClient } from "aurelia-fetch-client";
// import { HttpClient } from "aurelia-http-client";
import { inject } from "aurelia-framework";


@inject(HttpClient)
export class ContentApi {
  constructor(http) {
    this.http = http;
    // const baseUrl = 'http://localhost:7080/Plone/app';
    const baseUrl = 'http://gaipa.lan/app';
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
            let backendUrlPrefix = 'http://gaipa.lan/app';
            let clientUrlPrefix = 'http://app.gaipa.lan';
            if ( request.url.startsWith(backendUrlPrefix) ) {
              request.url = request.url.replace(
                backendUrlPrefix, clientUrlPrefix);
            }
            console.log(`Requesting ${request.method} ${request.url}`);
            return request;
          },
          response(response) {
            console.log(`Received ${response.status} ${response.url}`);
            return response;
          }
        });
        ;

    });
  }

  getCard(path) {
    return this.http.fetch(path)
      .then(response => response.json())
      .then(card => {
        return card;
      })
      .catch(error => {
        console.log('Error reading Nav Assistant Card!');
      });
      ;
  }

  getSolution(path) {
    return this.http.fetch(path)
      .then(response => response.json())
      .then(solution => {
        return solution;
      })
      .catch(error => {
        console.log('Error reading solution article data!');
      });
      ;
  }
}
