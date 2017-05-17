import { A4FitGridPage } from './app.po';

describe('a4-fit-grid App', () => {
  let page: A4FitGridPage;

  beforeEach(() => {
    page = new A4FitGridPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
