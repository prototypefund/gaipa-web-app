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
        ;

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

  getSolution(path) {
    return this.http.fetch(path)
      .then(response => response.json())
      .then(solution => {
        return solution;
      });
  }

  getSolutionServices(category) {
    let basePath = '/@search?portal_type=Solution%20Service&sort_on=sortable_title';
    let servicesPath = basePath;
    if (category) {
      servicesPath = servicesPath + '&solution_category=' + category;
    }
    return this.http.fetch(servicesPath)
      .then(response => response.json())
      .then(services => {
        return services.items;
      })
      //.then(services => new Promise(function(resolve, reject) {
      //  setTimeout(() => {
      //    resolve(services);
      //  }, 1500);
      //}))
      ;
  }

  getService(path) {
    return this.http.fetch(path)
      .then(response => response.json())
      .then(service => {
        return service;
      })
      .catch(error => {
        console.log('Error reading service data!');
      })
      ;
  }

}
