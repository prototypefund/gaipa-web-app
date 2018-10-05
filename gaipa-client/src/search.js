import { inject } from "aurelia-framework";
import {ContentApi} from './api';
import { BaseView } from './base';


@inject(ContentApi)
export class Search extends BaseView {
  heading = 'Search';
  availablePortalTypes = [
    {id: 'Chapter', name: 'Chapter'},
    {id: 'Solution Service', name: 'Service'},
    {id: 'NavAssistantCard', name: 'Nav Assistant Card'}
  ];

  constructor(contentApi, ...rest) {
    super(...rest);
    this.api = contentApi;
    this.searchableText = '';
    this.searchResultItems = [];
    this.portalTypes = [];
  }

  bind() {
  }

  search() {
    //let self = this;
    //let path = '/@search?sort_on=path,portal_type=SolutionArticle';
    let queryParams = new URLSearchParams();
    if (this.portalTypes.length) {
      queryParams.append('portal_type', this.portalTypes);
    }
    queryParams.append('sort_on', 'sortable_title');
    queryParams.append('metadata_fields', 'modified');
    this.api.search('/@search?' + queryParams.toString())
      .then(
        searchResult => {
          self.searchResultItems = searchResult.items;
        }
      )
      .catch(error => {
        this.eventAggregator.publish(
          'status-message', {message: 'Search error: ' + error.message, type: 'error'}
        );
      });
  }

}
