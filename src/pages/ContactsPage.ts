import { Page, expect } from '@playwright/test';
import logger from '../utils/LoggerUtil';
import { assert, error } from 'console';
import { TIMEOUT } from 'dns';

export default class ContactsPage {
    private readonly contactsLink = 'Contacts';
    private readonly newContactButton = 'New';
    private readonly firstNameInput = 'First Name';
    private readonly lastNameInput = 'Last Name';
    private readonly saveButton = 'Save';

    constructor(private page: Page) { }

    async createNewContact(firstName: string, lastName: string) {
        await this.page.getByRole('button', { name: this.newContactButton }).click();
        logger.info('New contact button is clicked');
        await this.page.getByRole('textbox', { name: this.firstNameInput }).fill(firstName);
        logger.info(`First name is entered as ${firstName}`);
        await this.page.getByRole('textbox', { name: this.lastNameInput }).fill(lastName);
        logger.info(`First name is entered as ${lastName}`);
        await this.page.getByRole('button', { name: this.saveButton, exact: true }).click().catch((error) => {
            logger.error(`Error clicking save button: ${error}`);
            throw error;
        }).then(() => logger.info('Save button is clicked'));

    }

    async expectNewContactToBeCreatedCorrect(firstName: string, lastName: string) {
        const alert = await this.page.getByRole('alert');

        if (alert.filter({ hasText: `Contact ${firstName} ${lastName} was created` })) {
            logger.info(`Contact ${firstName} ${lastName} was created`);
        } else {
            logger.error(`Error finding contact full name : ${error}`);
            throw new error;
        }
        // expect(alert.type()).toContain('alert');
        // expect(alert.message()).toContain(`Contact ${firstName} ${lastName} was created`);
        // await this.page.waitForTimeout(3000);
        // await alert.accept();
        // logger.info(`Contact full name created correctly as ${firstName} ${lastName}`);
        // console.log(`Contact full name created correctly as ${firstName} ${lastName}`);

        //     dialog.type();
        //     console.log(await dialog.type().toString());
        //     if (await dialog.defaultValue().toString().includes(`${firstName} ${lastName}`)) {
        //         logger.info(`Contact full name created correctly as ${firstName} ${lastName}`);
        //     } else {
        //         logger.error(`Error finding contact full name : ${error}`);
        //         throw new error;
        //     }


    }


}
