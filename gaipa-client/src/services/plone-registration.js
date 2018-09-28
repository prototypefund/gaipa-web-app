import {
  HttpClient,
  json
} from 'aurelia-http-client';
import {
  inject
} from 'aurelia-framework';
import {
  EventAggregator
} from 'aurelia-event-aggregator';


@inject(HttpClient, EventAggregator)
export class PloneRegistrationService {
  constructor(http, eventAggregator) {
    this.http = http;
    const baseUrl = __GAIPA_API__;
    this.eventAggregator = eventAggregator;
    http.configure(config => {
      config
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

  registerUser(email, fullname, username) {
    let registrationData = {
      fullname: fullname,
      email: email
    };
    if (username) {
      registrationData.username = username;
    }

    return this.http.post(
      '@users',
      JSON.stringify(registrationData)
    )
      .then(response => response)
      .then(result => {
        return result;
      });
  }
}
