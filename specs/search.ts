import { browser, $, $$, element, by, Key, ExpectedConditions as EC} from 'protractor'
import { async } from 'q';
import { HomePage } from '../pages/home';
import { expect } from 'chai';

describe('Search ', async function(){
    const homePage = new HomePage();
   
    beforeEach(async function(){
        await homePage.open();     
    })

    it('by exisiting name, should show first movie with complete name match', async function(){           
        let existingMovieTitleForSearch = await $$('movie-card').last().$('.text-ellipsis [title]').getText();
                
        await homePage.searchFor(existingMovieTitleForSearch);   
        /* Verify that after search applyed first movie card changes to the value we are searching */
        expect(await $$('movie-card').first().$('.text-ellipsis [title]').getText()).to.equal(existingMovieTitleForSearch);
    })

    it('results(all of them) should contain serach request', async function(){
        const SEARCH_REQUEST = 'Dreams';
        await homePage.searchFor(SEARCH_REQUEST);   
        let titles = await homePage.getFoundMoviesTitles();
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
