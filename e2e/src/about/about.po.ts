import { browser, by, element } from 'protractor';

export class AboutPage {
  navigateTo() {
    return browser.get('zeroapp/about');
  }

  getParagraphText() {
    return element(by.css('zerofee-app-about h1')).getText();
  }

  getGettingStarted() {
    return element(by.css('.get-started'));
  }

  getActionButton(idx) {
    return element.all(by.css('.actions a')).get(idx);
  }
}
