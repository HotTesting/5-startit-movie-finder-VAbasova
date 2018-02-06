import { browser, $, $$, element, by} from 'protractor'

describe('Navigation ',async function() {
    
    it('should open "Upcoming movies" section', async function() {
        let upcomingMoviesSectionNavigatonButton = $('a[routerlink*="upcoming"]');
        let sectionHeader = $('h3.orange-text');
        const UPCOMING_MOVIES_SECTION_LINK = 'https://movies-finder.firebaseapp.com/upcoming';
        const UPCOMING_MOVIES_SECTION_HEDER = 'Up Coming Movies';
        
        await browser.get('/');
        await upcomingMoviesSectionNavigatonButton.click();
        await browser.sleep(1000);

        //Verify that after click on upcomingMoviesSectionNavigatonButton url changes to '/upcoming'
        expect(await browser.getCurrentUrl()).toEqual(UPCOMING_MOVIES_SECTION_LINK); 
        expect(await sectionHeader.getText()).toEqual(UPCOMING_MOVIES_SECTION_HEDER);
    })

    it('should open "Popular Series" section', async function(){
        let popularSeriesSectionNavigatonButton = $('a[routerlink*="popular/series"]');
        let sectionHeader = $('h3.orange-text');
        const POPULAR_SERIES_SECTION_LINK = 'https://movies-finder.firebaseapp.com/popular/series';
        const POPULAR_SERIES_SECTION_HEDER = 'Popular Series';
        
        await browser.get('/');
        await popularSeriesSectionNavigatonButton.click();
        await browser.sleep(1000);

        //Verify that after click on popularSeriesSectionNavigatonButton url changes to '/popular/series'
        expect(await browser.getCurrentUrl()).toEqual(POPULAR_SERIES_SECTION_LINK);
        expect(await sectionHeader.getText()).toEqual(POPULAR_SERIES_SECTION_HEDER);
    })

    it('should open "Action" category', async function(){
        let actionCategoryMoviesCategory = $('a[href*="/Action"]');
        let sectionHeader = $('h3.orange-text');
        const ACTION_CATEGORY_LINK_ENDING = '/Action';
        const ACTION_CATEGORY_SECTION_HEDER = 'Action';
        
        await browser.get('/');
        await actionCategoryMoviesCategory.click();
        await browser.sleep(1000);

        //Verify that after click on actionCategoryMoviesCategory url changes to '/Action'
        expect(await browser.getCurrentUrl()).toContain(ACTION_CATEGORY_LINK_ENDING);
        expect(await sectionHeader.getText()).toEqual(ACTION_CATEGORY_SECTION_HEDER);
    })
})