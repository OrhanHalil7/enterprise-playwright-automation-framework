import { Browser, expect, Page, chromium } from '@playwright/test';


async function globalSetup({ }) {
    const browser: Browser = await chromium.launch();
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://login.salesforce.com/');
    await page.locator('#username').fill(process.env.userid!);
    await page.locator('#password').fill(process.env.password!);
    page
        .locator('#Login')
        .click()
        .catch((error) => {
            console.error(`Error clicking login button: ${error}`);
            throw error;
        }).then(() => console.info('Login is successful'));
    await expect(page.getByRole('tab', { name: 'Home' })).toBeVisible({ timeout: 10000 });
    await page.context().storageState({ path: './LoginAuth.json' });
    browser.close();
}

export default globalSetup;