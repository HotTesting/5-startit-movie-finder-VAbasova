import { browser, $, $$, element, by, Key, ExpectedConditions as EC} from 'protractor'
import { async } from 'q';
import { PopularSeries } from './popularSeries'

export class HomePage {
    private firstMovieOnPage = $$('movie-card').first();
    private searchField = $('input[name="searchStr"]');
    private foundMovies = $$('movies > div > div.row.is-flex movie-card');
    private popularSeriesSectionNavigatonButton = $('a[routerlink*="popular/series"]');
           
    async open() {
        await browser.get('/', 1000);
    }
 
    async searchFor(search_request: string | number) {
        await this.searchField.sendKeys(search_request, Key.ENTER);
        await browser.wait(EC.visibilityOf(this.firstMovieOnPage), 20000, 'movies should appear in 20 seconds, but it doesnt');
    }

    async getFoundMoviesTitles() {
        await browser.wait(EC.visibilityOf(this.firstMovieOnPage), 20000, 'movies should appear in 20 seconds, but it doesnt');
        return this.foundMovies.$$('a[title]').getAttribute('title');
    }
 
    async getMovieTitle(movieLocator = this.firstMovieOnPage) {
        return await movieLocator.$('a[title]').getAttribute('title');
    }

    async getMovieRiting(movieLocator = this.firstMovieOnPage) {
        return parseFloat(await movieLocator.$('small').getText());
    }

    async getMovieHref(movieLocator = this.firstMovieOnPage) {
        return await movieLocator.$('a[title]').getAttribute('href');
    }

    async openMovieDetails(movieLocator = this.firstMovieOnPage) {
        movieLocator.$('.text-ellipsis a').click();
        await browser.wait(EC.visibilityOf(this.firstMovieOnPage), 20000, 'movies should appear in 20 seconds, but it doesnt');
    }   

    async openPopularSeries() {
        this.popularSeriesSectionNavigatonButton.click();
        const psPage = new PopularSeries();
        psPage.pageLoaded();
    }   
}

