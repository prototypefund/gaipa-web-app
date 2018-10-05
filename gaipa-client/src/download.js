import { inject } from "aurelia-framework";
import {ContentApi} from './api';
import { BaseView } from './base';


@inject(ContentApi)
export class Download extends BaseView {
  constructor(contentApi, ...rest) {
    super(...rest);
    this.contentApi = contentApi;
    this.baseUrl = __GAIPA_API__ + '/app';
    this.count = undefined;
    this.current = undefined;
    this.promisses = [];
  }

  bind() {
    this.loadingProgress = 0;
  }

  downloadContent() {
    let self = this;
    let queryParams = new URLSearchParams();
    queryParams.append('b_size', 5000);
    queryParams.append('sort_on', 'sortable_title');
    queryParams.append('metadata_fields', 'modified');
    this.contentApi.search('/@search?' + queryParams.toString())
      .then(
        searchResult => {
          let searchResultItems = searchResult.items;
          self.count = searchResultItems.length;
          self.current = 1;
          for (var searchItem of searchResultItems) {
            let itemUrl = searchItem['@id'];
            self.loadingProgress = Math.floor((100 * self.current) / self.count);
            let path = itemUrl;
            path = path.replace(this.baseUrl, '');
            self.promisses.push(this.downloadItem(path));
          }
        }
      )
      .catch(error => {
        this.eventAggregator.publish(
          'status-message', {message: 'Download error: ' + error.message, type: 'error'}
        );
      });

    Promise.all(this.promisses).then(values => {
      self.eventAggregator.publish(
        'status-message', {
          message: `Dowload of ${this.count} elements complete.`,
          type: 'info'
        }
      );
      self.loadingProgress = 0;
    }, reason => {
      console.log("Error with promisses: " + reason);
    });
  }

  downloadItem(url) {
    let self = this;
    this.contentApi.get(url)
      .then(
        element => {
          console.log(url);
          self.current = self.current + 1;
        }
      )
      .catch(error => {
        this.error = error.message;
      });
  }
}
