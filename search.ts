import { browser, $, $$, element, by, Key, ExpectedConditions} from 'protractor'
import { async } from 'q';
import { until } from 'selenium-webdriver';

describe('Search ', async function(){

    it('by exisiting name, should show first movie with complete name match', async function(){
        await browser.get('/');
        
        let existingMovieTitleForSearch = await $$('movie-card').last().$('.text-ellipsis [title]').getText();
        let searchField = $('input[name="searchStr"]');

        await searchField.sendKeys(existingMovieTitleForSearch, Key.ENTER);
        await browser.sleep(1000); // Whaiting for search finished

        /* Verify that after search applyed first movie card changes to the value we are searching */
        expect(await $$('movie-card').first().$('.text-ellipsis [title]').getText()).toEqual(existingMovieTitleForSearch);
    })

    it('results(all of them) should contain serach request', async function(){

        await browser.get('/', 1000);
        
        const SEARCH_REQUEST = 'Dreams';
        let searchField = $('input[name="searchStr"]');

        await searchField.sendKeys(SEARCH_REQUEST, Key.ENTER);
        await browser.wait(until.elementLocated(by.css('movies > div > div.row.is-flex > div:nth-child(20)')), 5000, 'must be 20 search results');

        // Works unstable, from time to time crashes with error: Failed: ECONNREFUSED connect ECONNREFUSED 127.0.0.1:59437 
        //
        // await $$('movies > div > div.row.is-flex movie-card a[title]')
        //        .each(async(elem, index) => {
        //            expect(await elem.getAttribute('title')).toContain(SEARCH_REQUEST);
        //        });

        let foundMovieTitles = $$('movies > div > div.row.is-flex movie-card a[title]');
        let index;

        for (index = 0; index < await foundMovieTitles.count(); index++) {
            expect(await foundMovieTitles.get(index).getAttribute('title')).toContain(SEARCH_REQUEST)
        };

        expect(index).toBe(20, "must be 20 search results");
    })

    it('result should be empty, after request for nonexistent movie', async function(){
        await browser.get('/', 1000);

        const SEARCH_REQUEST = 'Nonexistent movie';
        let searchField = $('input[name="searchStr"]');

        await searchField.sendKeys(SEARCH_REQUEST, Key.ENTER);
        await browser.sleep(1000); // Whaiting for search finished

        let foundMovieTitles = $$('movies > div > div.row.is-flex movie-card a[title]');

        expect(await foundMovieTitles.count()).toBe(0);
    })
})