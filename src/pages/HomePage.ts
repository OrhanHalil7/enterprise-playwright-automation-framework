import { Page, expect } from '@playwright/test';
import logger from '../utils/LoggerUtil';
import ContactsPage from '../pages/ContactsPage';

export default class HomePage {

    private readonly serviceTitleLocatorService = 'Service';
    private readonly serviceTitleLocatorSetup = 'Setup';
    private readonly appLauncherLocator = 'App Launcher';
    private readonly contactTabLocator = 'Contact';
    private readonly serviceAppLocator = 'Service';


    constructor(private page: Page) { }


    async expectPageTitleToBeVisible() {
        await expect(this.page.getByTitle(this.serviceTitleLocatorSetup, { exact: true }).or(this.page.getByTitle(this.serviceTitleLocatorService, { exact: true }))).toBeVisible({ timeout: 15000 })
            .catch((error) => {
                logger.error(`Error waiting for service title to be visible: ${error}`);
                throw error;
            }).then(() => logger.info('Service title is visible'));
    }


    async navigateToContactsTab() {
        await expect(this.page.getByRole('button', { name: this.appLauncherLocator })).toBeVisible();
        await this.page.getByRole('button', { name: this.appLauncherLocator }).click().catch((error) => {
            logger.error(`Error clicking app launcher button: ${error}`);
            throw error;
        }).then(() => logger.info('App launcher button is clicked'));

        await expect(this.page.getByRole('option').filter({ hasText: this.serviceAppLocator }).first()).toBeVisible();
        await this.page.getByRole('option').filter({ hasText: this.serviceAppLocator }).first().click().catch((error) => {
            logger.error(`Error clicking Service app: ${error}`);
            throw error;
        }).then(() => logger.info('Service app is clicked'));
        await expect(this.page.getByRole('link', { name: this.contactTabLocator })).toBeVisible();
        logger.info('Contact tab is visible');
        await this.page.getByRole('link', { name: this.contactTabLocator }).click();
        logger.info('Contact tab is clicked');
        return new ContactsPage(this.page);
    }

    async navigateToHomePage() {
        await this.page.goto('https://paysafegroup3-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home');
    }
}