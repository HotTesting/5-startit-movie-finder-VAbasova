import { browser, $, $$, element, by, Key, ExpectedConditions as EC} from 'protractor'
import { async } from 'q';

export class MovieDetailsPage {
   private movieDetailsHeader = $('app-movie > div:nth-child(1) > div.col-md-8 > h2');
   private movieRaiting = $('app-movie h2 > small');
   private similarMovies = $$('app-movie > div.row.is-flex > div > movie-card');
   private actors = $$('app-movie > div > div.col-md-8 > div > div.col-md-3');
   private reviews = $$('app-movie blockquote');
   
   async getMovieDetailHeader() {
        await browser.wait(EC.visibilityOf(this.movieDetailsHeader), 10000, 'movie header should appear in 10 seconds, but it doesnt');
        return await this.movieDetailsHeader.getText();
   }
   
   async getMovieDetilsRaiting() {
        return parseFloat(await this.movieRaiting.getText());
   }

   async getSimilarMoviesTitles() {
        return this.similarMovies.$$('a[title]').getAttribute('title');
    }

    async getActorNames() {
        return this.actors.$$('a').getText();
    }

    async getReviewTexts() {
        return this.reviews.$$('p').getText();
    }

    async getReviewSources() {
        return this.reviews.$$('cite a').getAttribute('href');
    }
}

