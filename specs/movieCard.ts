import { browser, $, $$, element, by} from 'protractor';
import { expect } from 'chai';
import { HomePage } from '../pages/home';
import { MovieDetailsPage } from '../pages/movieDetails';

describe('Movie card ', async function(){
    const homePage = new HomePage();
       
    beforeEach(async function(){
        await homePage.open();     
    })
    
    it('should have name', async function(){
        expect(await homePage.getMovieTitle()).to.be.a('string');
    })

    it('should have "raiting" pointer', async function(){
        //Verify that the "raiting" pointer' movie card is a number
        expect(await homePage.getMovieRiting()).not.to.be.NaN;
    }) 

    it('should open appropriate "movie details" page, after click on "name" field', async function(){
        let movieCardTitle = await homePage.getMovieTitle();
        let movieCardHref = await homePage.getMovieHref();
        
        await homePage.openMovieDetails();
        const detailsPage = new MovieDetailsPage();
        
        expect(await browser.getCurrentUrl()).to.equal(movieCardHref); 
        expect(await detailsPage.getMovieDetailHeader()).to.contain(movieCardTitle);
    })
})