require('ts-node').register();

let log4js = require('log4js');
log4js.setGlobalLogLevel(process.env.LOG_LEVEL || 'INfO');
const logger = log4js.getLogger('ConfigLogger');

module.exports.config = {
    
    specs: ['./specs/*.ts'],
    baseUrl: 'https://movies-finder.firebaseapp.com/',
    SELENIUM_PROMISE_MANAGER: false,
    capabilities: { 
        browserName: 'chrome', 
        enableVNC: true,
        name: "Valery" // Just to identify your session between others on selenoid ui
        },
    framework: 'mocha',
    mochaOpts: {
        timeout: 60000,
        reporter: 'mocha-allure-reporter'
    }
}