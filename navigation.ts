import { browser, $, $$, element, by} from 'protractor'

describe('Navigation ',async function() {
    
    it('should open "Upcoming movies" section', async function() {
        let upcomingMoviesSectionNavigatonButton = $('a[routerlink*="upcoming"]');
        const UPCOMING_MOVIES_SECTION_LINK = 'https://movies-finder.firebaseapp.com/upcoming';
        
        await browser.get('/');
        await upcomingMoviesSectionNavigatonButton.click();

        //Verify that after click on upcomingMoviesSectionNavigatonButton url changes to '/upcoming'
        expect(await browser.getCurrentUrl()).toEqual(UPCOMING_MOVIES_SECTION_LINK); 
    })

    it('should open "Popular Series" section', async function(){
        let popularSeriesSectionNavigatonButton = $('a[routerlink*="popular/series"]');
        const POPULAR_SERIES_SECTION_LINK = 'https://movies-finder.firebaseapp.com/popular/series';
        
        await browser.get('/');
        await popularSeriesSectionNavigatonButton.click();

        //Verify that after click on popularSeriesSectionNavigatonButton url changes to '/popular/series'
        expect(await browser.getCurrentUrl()).toEqual(POPULAR_SERIES_SECTION_LINK);
    })

    it('should open "Action" category', async function(){
        let actionCategoryMoviesCategory = $('a[href*="/Action"]');
        const ACTION_CATEGORY_LINK_ENDING = '/Action';
        
        await browser.get('/');
        await actionCategoryMoviesCategory.click();

        //Verify that after click on actionCategoryMoviesCategory url changes to '/Action'
        expect(await browser.getCurrentUrl()).toContain(ACTION_CATEGORY_LINK_ENDING);
    })
})