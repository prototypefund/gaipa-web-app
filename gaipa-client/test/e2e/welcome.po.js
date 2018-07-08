export class PageObjectWelcome {
  getGreeting() {
    return element(by.tagName('h2')).getText();
  }
}
