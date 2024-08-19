import { test as base } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import ContactsPage from '../pages/ContactsPage';

export const test = base.extend<{ loginPage: LoginPage, homePage: HomePage, contactsPage: ContactsPage }>({
    //Define fixtures
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    contactsPage: async ({ page }, use) => {
        await use(new ContactsPage(page));
    }
})