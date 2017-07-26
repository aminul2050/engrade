import { EngradePage } from './app.po';

describe('engrade App', () => {
  let page: EngradePage;

  beforeEach(() => {
    page = new EngradePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
