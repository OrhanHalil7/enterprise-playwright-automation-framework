import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import { encrypt, decrypt } from '../utils/Cryptojs.utils';
import { decryptEnvFile, encryptEnvFile } from '../utils/EncryptEnvFiles';
import logger from '../utils/LoggerUtil';
import { exportToCsv, exportToJson, generateUserData } from '../utils/FakerDataUtil';
import HomePage from '../pages/HomePage';
//const { test, expect } = require('@playwright/test');

//Serial execution
//test.describe.configure({ mode: 'serial' })


test("Login test", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginUser(process.env.userid!, process.env.password!);
    const homePage = new HomePage(page);
    await homePage.expectServiceTitleToBeVisible();
    logger.info('Login successfully completed');
});

test.skip('Faker test data generation test', async ({ page }) => {
    const testData = generateUserData(10);
    exportToJson(testData, 'testdata.json');
    exportToCsv(testData, 'testdata.csv');
})

// test.afterAll("Close browser", async ({ page }) => {
//     await page.close();
// });

