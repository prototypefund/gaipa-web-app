import { bindable, inject } from "aurelia-framework";
import {ContentApi} from './api';


@inject(ContentApi)
export class SolutionService {
  constructor(gaipaContentApi) {
    this.contentApi = gaipaContentApi;
  }

  activate(params) {
    this.serviceId = params.id;
  }

  bind() {
    this.getServiceData('/service/' + this.serviceId);
  }

  navigateToService(child) {
    let path = child['@id'];
    path = path.substring(
      path.indexOf(this.router.currentInstruction.fragment)
    );
    //this.router.navigate(path)
    this.router.navigateToRoute('card', {path: path});
  }

  getServiceData(path) {
    this.contentApi.getService(path).then(
      service => this.service = service
    );
  }

}
