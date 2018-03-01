import { browser, $, $$, element, by, Key, ExpectedConditions as EC} from 'protractor'
import { async } from 'q';
import * as log4js from 'log4js';

/**
 * Class contains common base page logic
 */
export class BasePage {
    public logger = log4js.getLogger('SpecLogger');
    
    public searchField = $('input[name="searchStr"]');
    public sectionHeader = $('h3.orange-text');
}