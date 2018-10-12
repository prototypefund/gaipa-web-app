import { inject } from "aurelia-framework";
import {ContentApi} from './api';
import { BaseView } from './base';
import { map } from '../node_modules/rxjs/operator/map';


@inject(ContentApi)
export class Download extends BaseView {
  constructor(contentApi, ...rest) {
    super(...rest);
    this.contentApi = contentApi;
    this.baseUrl = __GAIPA_API__ + '/app';
    this.downloads = [];
    this.downloadDone = false;
    this.loadingProgress = {
      cards: 0,
      articles: 0,
      services: 0
    };
  }

  async downloadContentByCtGroup(ctGroupKey, ctGroup, queryParams) {
    let self = this;
    console.log(`download all content for: ${ctGroupKey}`);
    for (let ct of ctGroup) {
      queryParams.append('portal_type', ct);
    }
    try {
      const searchResult = await self.contentApi.search('/@search?' + queryParams.toString());
      const count = searchResult.items.length;
      let current = 0;
      console.log(`fetch ${count} item for ${ctGroupKey} group.`);
      return await Promise.all(searchResult.items.map(async function(searchItem) {
        const itemUrl = searchItem['@id'];
        const path = itemUrl.replace(self.baseUrl, '');
        try {
          const downloadResult = await self.contentApi.get(path);
          current = current + 1;
          console.log(`current: ${current}`);
          self.loadingProgress[ctGroupKey] = Math.floor((100 * current) / count);
          return downloadResult.content || '';
        } catch (error) {
          console.log(`error in download item: ${error}`);
        }
      }));
    } catch (error) {
      self.eventAggregator.publish(
        'status-message', {message: 'Error in search download items! ' + error.message, type: 'error'}
      );
      console.log(`error in search download items: ${error}`);
    }
  }

  async downloadContent() {
    let queryParams = new URLSearchParams();
    const contentTypeGroups = new Map([
      ['cards', ['NavAssistantCard']],
      ['articles', ['SolutionArticle', 'Chapter']],
      ['services', ['Solution Service']]
    ]);
    queryParams.append('b_size', 5000);
    queryParams.append('sort_on', 'sortable_title');
    queryParams.append('metadata_fields', 'modified');
    queryParams.append('portal_type', []);
    for (let [ctGroupKey, ctGroup] of contentTypeGroups) {
      this.downloads.push(
        await this.downloadContentByCtGroup(ctGroupKey, ctGroup, queryParams)
      );
    }
    this.downloadDone = true;
  }

}
