import { browser, $, $$, element, by, Key, ExpectedConditions as EC} from 'protractor'
import { async } from 'q';

export class MovieDetailsPage {
   private movieHeader = $('app-movie > div:nth-child(1) > div.col-md-8 > h2');
   private movieRaiting = $('app-movie h2 > small');
   private similarMovies = $$('app-movie > div.row.is-flex > div > movie-card');
   private actors = $$('app-movie > div > div.col-md-8 > div > div.col-md-3');
   private reviews = $$('app-movie blockquote');
   
   async getMovieHeader() {
        await browser.wait(EC.visibilityOf(this.movieHeader), 10000, 'movie header should appear in 10 seconds, but it doesnt');
        return await this.movieHeader.getText();
   }
   
   async getMovieRaiting() {
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
        let reviewSources: any = await this.reviews.$$('cite a').getAttribute('href');
        return reviewSources;
    }
}