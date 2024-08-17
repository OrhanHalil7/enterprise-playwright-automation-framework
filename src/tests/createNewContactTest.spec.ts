import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import logger from '../utils/LoggerUtil';
import cdata from '../testdata/testdata.json';
import ContactsPage from '../pages/ContactsPage';
import { convertCsvFileToJsonFile } from '../utils/CsvToJsonUtil';
import { exportToCsv, exportToJson, generateUserData } from '../utils/FakerDataUtil';
import HomePage from '../pages/HomePage';
//import { convertCsvFileToJsonFile } from '../utils/CSVToJSONUtil';

for (const contact of cdata) {
    test(`Create new contact test for ${contact.firstName}`, async ({ page }) => {
        logger.info(`Creating new contact test started`);
        const loginPage = new LoginPage(page);
        await loginPage.loginUser(process.env.userid!, process.env.password!);
        const homePage = new HomePage(page);
        await homePage.expectServiceTitleToBeVisible();
        await homePage.NavigateToContactsTab();
        const contactsPage = new ContactsPage(page);
        await contactsPage.createNewContact(contact.firstName, contact.lastName);
        await contactsPage.expectNewContactToBeCreatedCorrect(contact.firstName, contact.lastName);
        logger.info(`Creating new contact test completed`);

    });
}

test.skip('Convert CSV to JSON test', async ({ page }) => {

    convertCsvFileToJsonFile('data.csv', 'datademo.json');

})

test.skip('Faker test data generation test', async ({ page }) => {
    const testData = generateUserData(5);
    exportToJson(testData, 'testdata.json');
    exportToCsv(testData, 'testdata.csv');



})