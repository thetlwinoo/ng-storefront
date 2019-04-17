import { BoxPage } from './app.po';

describe('Box App', () => {
    let page: BoxPage;

    beforeEach(() => {
        page = new BoxPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to Box!');
    });
});
