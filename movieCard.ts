import { browser, $, $$, element, by} from 'protractor'

describe('Movie card ', async function(){
    
    it('should have name', async function(){
        let movieCardTitle = $$('movie-card').first().$('.text-ellipsis [title]');
        
        await browser.get('/');
        
        //Verify that the name of movie card is displayed
        expect(await movieCardTitle.isDisplayed()).toBe(true);
    })

    it('should have "raiting" pointer', async function(){
        let movieCardRitingPointer = $$('movie-card').first().$('small');

        await browser.get('/');
        
        //Verify that the "raiting" pointer' movie card is displayed
        expect(await movieCardRitingPointer.isDisplayed()).toBe(true);
    }) 

    fit('should open appropriate "movie details" page, after click on "name" field', async function(){
        await browser.get('/');

        let movieCardTitle = $$('movie-card').first().$('.text-ellipsis a');
        let movieCardHref = await movieCardTitle.getAttribute('href');
        
        await movieCardTitle.click(); 

        //Verify that after click on "name" field url changes to movie card href value
        expect(await browser.getCurrentUrl()).toEqual(movieCardHref); 
    })
})