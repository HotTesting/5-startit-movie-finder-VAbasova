import { browser, $, $$, element, by, Key, ExpectedConditions as EC} from 'protractor'
import { async } from 'q';

export class UpcomingMovies {
    private sectionHeader = $('h3.orange-text');
    private allMovies = $$('app-upcoming  movie-card');
    public SECTION_LINK = 'https://movies-finder.firebaseapp.com/upcoming';
    public SECTION_HEDER = 'Up Coming Movies';
   
   async pageLoaded() {
        await browser.wait(EC.and
            (EC.visibilityOf(this.sectionHeader),
            EC.visibilityOf(this.allMovies.last())), 20000, 'upcoming movies should appear in 20 seconds, but it doesnt')
    }

    async getSectionHeader() {
        return this.sectionHeader.getText();
    }
}