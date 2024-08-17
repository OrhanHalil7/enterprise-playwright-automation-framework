import { Page } from '@playwright/test';
import HomePage from './HomePage';
import logger from '../utils/LoggerUtil';

export default class LoginPage {
    private readonly usernameInputSelector = "#username";
    private readonly passwordInputSelector = "#password";
    private readonly loginButonSelector = "#Login";

    constructor(private page: Page) {

    }

    async loginUser(username: string, password: string) {
        await this.page.goto('/');
        await this.page.locator(this.usernameInputSelector).fill(username);
        await this.page.locator(this.passwordInputSelector).fill(password);
        this.page
            .locator(this.loginButonSelector)
            .click()
            .catch((error) => {
                logger.error(`Error clicking login button: ${error}`);
                throw error;
            }).then(() => logger.info('Login is successful'));
        const homePage = new HomePage(this.page);

        return homePage;
    }

    // async navigateToLoginPage() {
    //     await this.page.goto('/');
    //     logger.info('Navigated to login page');
    // }
    // async fillUserName(username: string) {
    //     await this.page.locator(this.usernameInputSelector).fill(username);
    //     logger.info('Entered username');
    // }

    // async fillPassword(password: string) {
    //     await this.page.locator(this.passwordInputSelector).fill(password);
    //     logger.info('Entered password');
    // }

    // async clickLoginbutton() {
    //     this.page
    //         .locator(this.loginButonSelector)
    //         .click()
    //         .catch((error) => {
    //             logger.error(`Error clicking login button: ${error}`);
    //             throw error;
    //         }).then(() => logger.info('Clicked login button'));
    //     const homePage = new HomePage(this.page);

    //     return homePage;

    // }
}