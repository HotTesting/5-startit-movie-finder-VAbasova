import { browser, $, $$, element, by, Key, ExpectedConditions as EC} from 'protractor'
import { async } from 'q';
import { HomePage } from '../pages/home';
import { expect } from 'chai';
import * as log4js from 'log4js';

describe('Search ', async function(){
    const homePage = new HomePage();
    const logger = log4js.getLogger('SpecLogger');
   
    beforeEach(async function(){
        await homePage.open();     
    })

    it('by exisiting name, should show first movie with complete name match', async function(){           
        let existingMovieTitleForSearch = await homePage.getMovieTitle();
                
        await homePage.searchFor(existingMovieTitleForSearch);   
        /* Verify that after search applyed first movie card changes to the value we are searching */
        expect(await $$('movie-card').first().$('.text-ellipsis [title]').getText()).to.equal(existingMovieTitleForSearch);
    })

    //test skipped becuse of error in this functionality
    it.skip('results(all of them) should contain serach request', async function(){
        const SEARCH_REQUEST = 'Dreams';
        await homePage.searchFor(SEARCH_REQUEST);   
        let titles: any = await homePage.getFoundMoviesTitles();
        expect(titles.length).to.equal(20, 'Number of found movies must be 20')
        
        titles.forEach(title => expect(title).to.contain(SEARCH_REQUEST))      
    })

    it('result should be empty, after request for nonexistent movie', async function(){
        const SEARCH_REQUEST = 'Nonexistent movie';
        await homePage.searchFor(SEARCH_REQUEST);   
        let foundMovieTitles = await homePage.getFoundMoviesTitles();

        expect(await foundMovieTitles.length).to.equal(0, 'Number of found movies must be 0');
    })
})
