import { browser, $, $$, element, by} from 'protractor';
import { expect } from 'chai';

describe('Navigation ',async function() {
    
    it('should open "Upcoming movies" section', async function() {
        let upcomingMoviesSectionNavigatonButton = element(by.partialLinkText('Upcoming')); //$('a[routerlink*="upcoming"]');
        let sectionHeader = $('h3.orange-text');
        const UPCOMING_MOVIES_SECTION_LINK = 'https://movies-finder.firebaseapp.com/upcoming';
        const UPCOMING_MOVIES_SECTION_HEDER = 'Up Coming Movies';
        
        await browser.get('/');
        await upcomingMoviesSectionNavigatonButton.click();
        await browser.sleep(1000);

        //Verify that after click on upcomingMoviesSectionNavigatonButton url changes to '/upcoming'
        expect(await browser.getCurrentUrl()).to.equal(UPCOMING_MOVIES_SECTION_LINK); 
        expect(await sectionHeader.getText()).to.equal(UPCOMING_MOVIES_SECTION_HEDER);
    })

    it('should open "Popular Series" section', async function(){
        let popularSeriesSectionNavigatonButton = element(by.partialLinkText('Popular Series')); //$('a[routerlink*="popular/series"]');
        let sectionHeader = $('h3.orange-text');
        const POPULAR_SERIES_SECTION_LINK = 'https://movies-finder.firebaseapp.com/popular/series';
        const POPULAR_SERIES_SECTION_HEDER = 'Popular Series';
        
        await browser.get('/');
        await popularSeriesSectionNavigatonButton.click();
        await browser.sleep(1000);

        //Verify that after click on popularSeriesSectionNavigatonButton url changes to '/popular/series'
        expect(await browser.getCurrentUrl()).to.equal(POPULAR_SERIES_SECTION_LINK);
        expect(await sectionHeader.getText()).to.equal(POPULAR_SERIES_SECTION_HEDER);
    })
})

describe.skip('Category navigation',async function() {
    
    beforeEach(async function () {
        await browser.get('/');
    })
    let categories = [ 'Action',  'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy',
        'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western' ]
    
        
    categories.map(category => {
        it(`should open ${encodeURI(category)} category`, async function(){
            console.log(await category); 
            let moviesCategory = $(`a[href*="/${encodeURI(category)}"]`);
            let sectionHeader = $('h3.orange-text');
             
            await browser.get('/');
            await moviesCategory.click();
            await browser.sleep(1000);
    
            expect(await browser.getCurrentUrl()).to.contain(encodeURI(category));
            expect(await sectionHeader.getText()).to.equal(category);
        })
    })
})