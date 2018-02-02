import { browser, $, $$, element, by} from 'protractor'

describe('Navigation ',async function() {
    
    it('should open "Upcoming movies" section', async function() {
        let upcomingMoviesSectionNavigatonButton = $('a[routerlink*="upcoming"]');
        const UpcomingMoviesSectionLink = 'https://movies-finder.firebaseapp.com/upcoming';
        
        await browser.get('/');
        await upcomingMoviesSectionNavigatonButton.click();

        //Verify that after click on upcomingMoviesSectionNavigatonButton url changes to '/upcoming'
        expect(await browser.getCurrentUrl()).toEqual(UpcomingMoviesSectionLink); 
    })

    it('should open "Popular Series" section', async function(){
        let popularSeriesSectionNavigatonButton = $('a[routerlink*="popular/series"]');
        const PopularSeriesSectionLink = 'https://movies-finder.firebaseapp.com/popular/series';
        
        await browser.get('/');
        await popularSeriesSectionNavigatonButton.click();

        //Verify that after click on popularSeriesSectionNavigatonButton url changes to '/popular/series'
        expect(await browser.getCurrentUrl()).toEqual(PopularSeriesSectionLink);
    })

    it('should open "Action" category', async function(){
        let actionCategoryMoviesCategory = $('a[href*="/Action"]');
        const ActionCategoryLinkEnding = '/Action';
        
        await browser.get('/');
        await actionCategoryMoviesCategory.click();

        //Verify that after click on actionCategoryMoviesCategory url changes to '/Action'
        expect(await browser.getCurrentUrl()).toContain(ActionCategoryLinkEnding);
    })
})