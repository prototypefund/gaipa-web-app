import { bindable, inject } from "aurelia-framework";
import {ContentApi} from './api';


@inject(ContentApi)
export class SolutionService {
  constructor(gaipaContentApi) {
    this.contentApi = gaipaContentApi;
    this.baseUrl = __GAIPA_API__;
  }

  activate(params) {
    this.providerId = params.providerId;
    this.serviceId = params.serviceId;
  }

  bind() {
    let path = '/provider/' + this.providerId + '/service/' + this.serviceId;
    this.getServiceData(path);
  }

  getServiceData(path) {
    this.contentApi.getService(path).then(
      service => this.service = service
    );
  }

}
