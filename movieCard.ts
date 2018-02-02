import { browser, $, $$, element, by} from 'protractor'

describe('Movie card ', async function(){
    
    it('should have name', async function(){
        await browser.get('/');
        let movieCardTitle = $$('movie-card').first().$('.text-ellipsis [title]');
        expect(await movieCardTitle.isDisplayed()).toBe(true);
    })

    it('should have "raiting" pointer', async function(){
        await browser.get('/');
        let movieCardRitingPointer = $$('movie-card').first().$('small');
        expect(await movieCardRitingPointer.isDisplayed()).toBe(true);
    }) 

    it('should open appropriate "movie details" page, after click on "name" field', async function(){
        await browser.get('/');
        let movieCardTitle = $$('movie-card').first().$('.text-ellipsis a');
        let movieCardHref = await movieCardTitle.getAttribute('href');
        await movieCardTitle.click();  
        expect(movieCardHref).toEqual(await browser.getCurrentUrl());
    })
})