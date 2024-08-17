import { expect, test } from '@playwright/test';
import logger from '../utils/LoggerUtil';
import { stringify } from 'querystring';


//Serial execution
test.describe.configure({ mode: 'serial' })

test('Get request test', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2');
    expect(response.status()).toBe(200);
    logger.info('Response is:' + JSON.stringify(await response.json()));
})

test('Post request test', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
        data: {
            name: 'Jummy',
            job: 'Clerk'
        }
    });
    expect(response.status()).toBe(201);
    expect(await response.json()).toHaveProperty('name', 'Jummy');
    logger.info(`Response is: ` + JSON.stringify(await response.json()));
})

test('Delete request test', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/2');
    expect(response.status()).toBe(204);
    //expect(response).toBeOK();
    logger.info(`Response is: ` + JSON.stringify(await response.text()));
})