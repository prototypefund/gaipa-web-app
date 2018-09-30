import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { EventAggregator } from 'aurelia-event-aggregator';


@inject(Router, EventAggregator)
export class BaseView {
  constructor(router, eventAggregator) {
    this.router = router;
    this.eventAggregator = eventAggregator;
  }

}
