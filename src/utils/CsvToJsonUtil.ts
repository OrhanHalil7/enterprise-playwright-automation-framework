import * as fs from 'fs';
import { data } from 'jquery';
import path, { delimiter } from 'path';

const CSVToJSON = (data, delimiter = ',') => {

    const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
    return data.slice(data.indexOf('\n') + 1).split('\n').map(row => {
        const values = row.split(delimiter);
        return titles.reduce((object, title, index) => ((object[title.trim()] = values[index].trim()), object), {});
    });
};


//Usage

const currentDir = __dirname;
const sourceDir = path.resolve(currentDir, "..");
const testDataDir = path.resolve(sourceDir, "testdata");
const csvFilePath = `${testDataDir}`;

export const convertCsvFileToJsonFile = (csvFileName, jsonFileName, delimiter = ',') => {

    try {
        //Read csv file
        const csvData = fs.readFileSync(`${testDataDir}\\${csvFileName}`, 'utf8');

        //Convert CSV to JSON
        const jsonData = CSVToJSON(csvData, delimiter);

        //Write JSON data to new file 
        fs.writeFileSync(`${testDataDir}\\${jsonFileName}`, JSON.stringify(jsonData, null, 2));

        console.log(`CSV file converted to JSON successfully!, JSON data written to: ${testDataDir}\\${csvFileName}`);
    } catch (error) {
        console.error('Error converting CSV to JSON', error.message);
    }
}