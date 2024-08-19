import { test } from '../fixtures/basePage';
import { decryptEnvFile, encryptEnvFile } from '../utils/EncryptEnvFiles';
import logger from '../utils/LoggerUtil';
import { exportToCsv, exportToJson, generateUserData } from '../utils/FakerDataUtil';
import HomePage from '../pages/HomePage';
//const { test, expect } = require('@playwright/test');

//Serial execution
//test.describe.configure({ mode: 'serial' })


test("Login test", async ({ loginPage, homePage }) => {
    await loginPage.loginUser(process.env.userid!, process.env.password!);
    await homePage.expectPageTitleToBeVisible();
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

