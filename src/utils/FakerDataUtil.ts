import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import path from 'path';
import * as csvWriter from 'csv-writer';
import { createArrayCsvWriter, createObjectCsvWriter } from 'csv-writer';


//Define type of the user data
interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    age: number;
    city: string;
}

//function to generate random user data
const generateRandomUserData = (): UserData => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const phoneNumber = faker.phone.number();
    const address = faker.location.streetAddress();
    const city = faker.location.city();
    const age = faker.number.int({ min: 18, max: 65 });
    return { firstName, lastName, email, password, phoneNumber, address, city, age };
};

//Function to generate an array of fake user data
export const generateUserData = (numberOfRecords: number): UserData[] => {
    const testData: UserData[] = faker.helpers.multiple(generateRandomUserData, { count: numberOfRecords });
    return testData;
}

const currentDir = __dirname;
const sourceDir = path.resolve(currentDir, "..");
const testDataDir = path.resolve(sourceDir, "testdata");

//Fucntion to export data to JSON file
export const exportToJson = (data: UserData[], fileName: string) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(`${testDataDir}\\${fileName}`, jsonData);
    console.log(`Data exported successfully to JSON file: ${testDataDir}\\${fileName}`);
}

//Function to export data to CSV file

export const exportToCsv = (data: UserData[], fileName: string) => {
    const csvWriter = createObjectCsvWriter({
        path: `${testDataDir}\\${fileName}`,
        header: [
            { id: 'firstName', title: 'First Name' },
            { id: 'lastName', title: 'Last Name' },
            { id: 'email', title: 'Email' },
            { id: 'password', title: 'Password' },
            { id: 'phoneNumber', title: 'Phone Number' },
            { id: 'address', title: 'Address' },
            { id: 'age', title: 'Age' },
            { id: 'city', title: 'City' },
        ],

    });
    console.log(`Data exported successfully to CSV file: ${testDataDir}\\${fileName}`);
    csvWriter.writeRecords(data) // returns a promise

}