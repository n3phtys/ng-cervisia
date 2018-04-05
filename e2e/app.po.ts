import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/index.html');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
