import { SpokePage } from './app.po';

describe('spoke App', () => {
  let page: SpokePage;

  beforeEach(() => {
    page = new SpokePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
