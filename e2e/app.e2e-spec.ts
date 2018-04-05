import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

const { performance } = require('perf_hooks');

describe('ng-cervisia App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to The Official AVH Cervisia Frontend!');
  });


  it('should deal with 100 purchases by first user', () => {
    page.navigateTo();
    browser.sleep(200);

    const iterations = 100;

    const before = performance.now();

    for (var i = 0; i < iterations; i++) {
      element(by.id('AllUsersUserSelectionBtn_0')).click();
      browser.sleep(50);
      element(by.id('QuickMenuPurchaseBtn_0')).click();
      browser.sleep(30);
    }


    browser.sleep(1).then(function() {

      const after = performance.now();

      console.log('First user buying 100 times took: ' + (after - before) + ' milliseconds, with waiting time: ' + (iterations * (50 + 30)) + ' milliseconds.');
    });


  });

  it('should deal with 100 random users buying once', () => {

    page.navigateTo();
    browser.sleep(200);


    const iterations = 100;

    const before = performance.now();
    for (var i = 0; i < iterations; i++) {
      element(by.id('allUsersSearchBar')).clear();
      //search for user 
      let username = "GenUser #" + (300 + i).toString();
      element(by.id('allUsersSearchBar')).sendKeys(username);
      browser.sleep(20);

      element(by.id('AllUsersUserSelectionBtn_0')).click();
      browser.sleep(50);
      element(by.id('QuickMenuPurchaseBtn_0')).click();
      browser.sleep(30);
    }

    browser.sleep(1).then(function() {

      const after = performance.now();

      console.log('100 random users buying once took: ' + (after - before) + ' milliseconds, with waiting time: ' + (iterations * (20 + 50 + 30)) + ' milliseconds.');
    });


  });




});
