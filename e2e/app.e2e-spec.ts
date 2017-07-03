import { Ng2ChatboxPage } from './app.po';

describe('ng2-chatbox App', () => {
  let page: Ng2ChatboxPage;

  beforeEach(() => {
    page = new Ng2ChatboxPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
