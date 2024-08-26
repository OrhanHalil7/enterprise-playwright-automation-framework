import { test } from '../fixtures/basePage';
import logger from '../utils/LoggerUtil';
import cdata from '../testdata/testdata.json';
import { convertCsvFileToJsonFile } from '../utils/CsvToJsonUtil';
import { exportToCsv, exportToJson, generateUserData } from '../utils/FakerDataUtil';
//import { convertCsvFileToJsonFile } from '../utils/CSVToJSONUtil';

for (const contact of cdata) {
    test(`Create new contact test for ${contact.firstName}`, async ({ loginPage, homePage, contactsPage }) => {
        logger.info(`Creating new contact test started`);
        await homePage.navigateToHomePage(); //await loginPage.loginUser(process.env.userid!, process.env.password!);
        await homePage.expectPageTitleToBeVisible();
        await homePage.navigateToContactsTab();
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