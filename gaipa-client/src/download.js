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
    this.downloads = [];
    this.loadingProgress = 0;
  }

  downloadContent() {
    let queryParams = new URLSearchParams();
    queryParams.append('b_size', 5000);
    queryParams.append('sort_on', 'sortable_title');
    queryParams.append('metadata_fields', 'modified');
    this.contentApi.search('/@search?' + queryParams.toString())
      .then(
        async searchResult => {
          let searchResultItems = searchResult.items;
          this.count = searchResultItems.length;
          this.current = 0;
          for (var searchItem of searchResultItems) {
            let itemUrl = searchItem['@id'];
            let path = itemUrl;
            path = path.replace(this.baseUrl, '');
            try {
              let downloadResult = await this.contentApi.get(path);
              this.downloads.push(downloadResult.content || '');
              this.current = this.current + 1;
              this.loadingProgress = Math.floor((100 * this.current) / this.count);
              console.log(this.loadingProgress);
            } catch (error) {
              console.log(error);
            }
          }
          this.eventAggregator.publish(
            'status-message', {
              message: `Dowload of ${this.count} elements complete.`,
              type: 'info'
            }
          );
        }
      )
      .catch(error => {
        this.eventAggregator.publish(
          'status-message', {message: 'Download error: ' + error.message, type: 'error'}
        );
      });
  }
}
