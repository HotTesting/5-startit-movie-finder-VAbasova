import { browser, $, $$, element, by} from 'protractor';
import { expect } from 'chai';
import { HomePage } from '../pages/home';

describe('Movie card ', async function(){
    const homePage = new HomePage();
       
    beforeEach(async function(){
        await homePage.open();     
    })
    
    it('should have name', async function(){
        expect(await homePage.getMovieTitle()).to.be.a('string');
        homePage.logger.info('the movie-card name is ', await homePage.getMovieTitle()); 
    })

    it('should have "raiting" pointer', async function(){
        //Verify that the "raiting" pointer' movie card is a number
        expect(await homePage.getMovieRiting()).not.to.be.NaN;
        homePage.logger.info('the raiting is ', await homePage.getMovieRiting()); 
    }) 

    it('should open appropriate "movie details" page, after click on "name" field', async function(){
        let movieCardTitle = await homePage.getMovieTitle();
        let movieCardHref = await homePage.getMovieHref();
        
        const detailsPage = await homePage.openMovieDetails();
                
        expect(await browser.getCurrentUrl()).to.equal(movieCardHref); 
        expect(await detailsPage.getMovieHeader()).to.contain(movieCardTitle);
    })
})