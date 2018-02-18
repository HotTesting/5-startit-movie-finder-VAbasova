import { browser, $, $$, element, by, Key, ExpectedConditions as EC} from 'protractor'
import { async } from 'q';

export class PopularSeries {
   private popularSeriesList = $$('app-popular-series > div > div > div.col-sm-6.col-md-4.col-lg-3.col-xs-6');
   
   async pageLoaded() {
        await browser.wait(EC.visibilityOf(this.popularSeriesList.last()), 20000, 'popular series should appear in 10 seconds, but it doesnt');
    }
}

