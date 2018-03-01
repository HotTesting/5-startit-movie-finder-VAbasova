import { browser, $, $$, element, by, Key, ExpectedConditions as EC} from 'protractor'
import { async } from 'q';
import { BasePage } from './base';
import { PopularSeries } from './popularSeries';
import { UpcomingMovies } from './upcomingMovies';
import { MovieDetailsPage } from './movieDetails'

export class HomePage extends BasePage {
    private firstMovieOnPage = $$('movie-card').first();
    private foundMovies = $$('movies > div > div.row.is-flex movie-card');
    private popularSeriesSectionNavigatonButton = element(by.partialLinkText('Popular Series')); //$('a[routerlink*="popular/series"]');
    private upcomingMoviesSectionNavigatonButton = element(by.partialLinkText('Upcoming')); //$('a[routerlink*="upcoming"]');
    public LINK = 'https://movies-finder';
           
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
        if (movieLocator === this.firstMovieOnPage) {
            this.logger.warn("function returns title for ", await movieLocator.$('a[title]').getAttribute('title'), " movie");
        }
        return await movieLocator.$('a[title]').getAttribute('title');
    }

    async getMovieRiting(movieLocator = this.firstMovieOnPage) {
        if (movieLocator === this.firstMovieOnPage) {
            this.logger.warn("function returns raiting for ", await movieLocator.$('a[title]').getAttribute('title'), " movie");
        }
        return parseFloat(await movieLocator.$('small').getText());
    }

    async getMovieHref(movieLocator = this.firstMovieOnPage) {
        if (movieLocator === this.firstMovieOnPage) {
            this.logger.warn("function returns href for ", await movieLocator.$('a[title]').getAttribute('title'), " movie");
        }
        return await movieLocator.$('a[title]').getAttribute('href');
    }

    async openMovieDetails(movieLocator = this.firstMovieOnPage) {
        if (movieLocator === this.firstMovieOnPage) {
            this.logger.warn("function opens ", await movieLocator.$('a[title]').getAttribute('title'), " movie");
        }
        movieLocator.$('.text-ellipsis a').click();
        const mdPage = new MovieDetailsPage();
        await mdPage.pageLoaded();

        return mdPage;
    }   

    async openPopularSeries() {
        this.popularSeriesSectionNavigatonButton.click();
        const psPage = new PopularSeries();
        await psPage.pageLoaded();

        return psPage;
    }
    
    async openUpcomingMovies() {
        this.upcomingMoviesSectionNavigatonButton.click();
        const umPage = new UpcomingMovies();
        await umPage.pageLoaded();

        return umPage;
    }   
}

