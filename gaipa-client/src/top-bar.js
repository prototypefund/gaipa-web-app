import {
  inject
} from 'aurelia-framework';
import {
  EventAggregator
} from 'aurelia-event-aggregator';


@inject(EventAggregator)
export class TopBar {
  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.message = {message: '', type: 'info'};
  }

  bind() {
  }

  attached() {
    this.statusMessage = this.subscribe();
  }

  subscribe() {
    this.eventAggregator.subscribe('status-message', s => {
      this.message = s;
    });
  }

  detached() {
    this.statusMessage.dispose();
  }

  clearMessage() {
    this.message = {message: '', type: 'info'};
  }
}

