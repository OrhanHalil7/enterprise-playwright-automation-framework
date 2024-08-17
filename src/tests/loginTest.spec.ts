import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import { encrypt, decrypt } from '../utils/Cryptojs.utils';
import { decryptEnvFile, encryptEnvFile } from '../utils/EncryptEnvFiles';
import logger from '../utils/LoggerUtil';
import HomePage from '../pages/HomePage';
//const { test, expect } = require('@playwright/test');

//Serial execution
//test.describe.configure({ mode: 'serial' })


test("Login test", async ({ page, browser }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginUser(process.env.userid!, process.env.password!);
    const homePage = new HomePage(page);
    await homePage.expectServiceTitleToBeVisible();
    logger.info('Login successfully completed');
});


test.skip("Sample env test", async ({ page }) => {
    console.log(process.env.NODE_ENV);
    console.log(process.env.userid);
    console.log(process.env.password);
});

test.skip("Encrypt and decrypt test", async ({ page }) => {
    //const plainText = encrypt("Hello World, its incrypted!");
    //const encryptedText = encrypt(plainText);
    //console.log('SALT: ', process.env.SALT);
    //console.log('Encrypted: ' + encryptedText);
    //const decryptedText = decrypt(encryptedText);
    //console.log('Decrypted:', decryptedText);
    // encryptEnvFile();
    // decryptEnvFile();
});

test.skip("Login with encryption test", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginUser(process.env.userid!, process.env.password!);
    const homePage = new HomePage(page);
    await homePage.expectServiceTitleToBeVisible();
});

