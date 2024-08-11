import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import { log } from 'console';



test("test", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUserName('orkhan.khalilov@hotmail.com');
    await loginPage.fillPassword('Orik7170047!');
    const homePage = await loginPage.clickLoginbutton();
    await homePage.expectServiceTitleToBeVisible();
});




