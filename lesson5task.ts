import { browser, $, $$, element, by, By, ExpectedConditions as EC} from 'protractor';
import { expect } from 'chai';
import { WSAEACCES } from 'constants';
import { HomePage } from './pages/home';
import { MovieDetailsPage } from './pages/movieDetails';

describe('Movie details', async function () {
    const homePage = new HomePage();
    const detailsPage = new MovieDetailsPage();

    beforeEach(async function () {
        await homePage.open();       
    })

    it('should have movie name as header', async function () {
        let movieCardTitle = await homePage.getMovieTitle();      
        await homePage.openMovieDetails();
        
        expect(await detailsPage.getMovieDetailHeader()).to.contain(movieCardTitle); 
    })

    it('should have raiting', async function () {  
        await homePage.openMovieDetails();
                
        //Verify that raiting value is a number
        expect(await detailsPage.getMovieDetilsRaiting()).not.to.be.NaN;
        console.log('the raiting is ', await detailsPage.getMovieDetilsRaiting()); 
    })

    it('should have simular movies block with atleast one movie', async function () {
        await homePage.openMovieDetails();
        let similsrMoviesTitles = await detailsPage.getSimilarMoviesTitles();
                
        expect(await similsrMoviesTitles.length).to.be.above(0, 'there is no movies in simular movies block');
        console.log('there is ', await similsrMoviesTitles.length,' simular movies');
    })

    describe('cast block', async function () {
        beforeEach(async function () {
            await homePage.openMovieDetails();  
        })
        it('should show atleast one actor', async function () {
            let actorNames = await detailsPage.getActorNames();
                          
            expect(await actorNames.length).to.be.above(0, 'there is no actors in cast block');
            console.log(await actorNames.length + ' actors shows');     
        })
    })

    describe('reviews block', function () {
        beforeEach(async function () {
            await homePage.openMovieDetails();   
        })

        it('should be atleast one review', async function () {
            let reviews = await detailsPage.getReviewTexts();
        
            expect(await reviews.length).to.be.above(0, 'there is no reviews in reviews block');
            console.log('there is ', await reviews.length,' reviews');   
        })

        it('should have reviewer name as link to source', async function () {
            const THIS_SITE_LINK = 'https://movies-finder';
            
            let reviewSourceLinks = await detailsPage.getReviewSources();
            reviewSourceLinks.forEach(sourceLink => {
                expect(sourceLink).not.to.contain(THIS_SITE_LINK);
                console.log(sourceLink);
            })
        })
    })
})

describe('Popular series', async function () {
    const homePage = new HomePage();

    beforeEach(async function () {
        await browser.manage().timeouts().implicitlyWait(1000);
        await homePage.open();  
    })

    it('shouldnt have search bar', async function () {
        let searchBar = $('div.jumbotron');
        
        await searchBar.isDisplayed;
        homePage.openPopularSeries()
       
        expect(await searchBar.isPresent()).to.be.false;
    })

    it('should have "First Air Date" instead "Release Date"', async function () {
        let reliseDateLocator = $$('p strong ').first();

        expect(await reliseDateLocator.getText()).to.contain('Release Date:');
        homePage.openPopularSeries()
        await browser.wait(EC.visibilityOf(reliseDateLocator), 20000, 'First movie card should appear in 20 seconds, but it doesnt');
       
        expect(await reliseDateLocator.getText()).to.contain('First Air Date:');
    })
})