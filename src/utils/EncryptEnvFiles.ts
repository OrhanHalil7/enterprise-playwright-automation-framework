let CryptoJSUtil = require("crypto-js");
let fs = require("fs");
let path = require("path");

const SALT = process.env.SALT || "defaultSalt";
const currentDir = __dirname;
const sourceDir = path.resolve(currentDir, "..");

//Change to config folder

const configDir = path.resolve(sourceDir, "config");
const envFilePath = `${configDir}\\.env`;
if (process.env.NODE_ENV) {
    const envFilePath = `${configDir}\\.env.${process.env.NODE_ENV}`;
}
console.log(envFilePath);

export function encryptEnvFile() {
    //Read env file
    const envFileContent = fs.readFileSync(envFilePath, 'utf8');
    const envLines = envFileContent.split("\n");

    //Encrypt values and update array
    const encryptedLines = envLines.map(line => {
        const [key, value] = line.split("=");

        if (value) {
            const encryptedValue = CryptoJSUtil.AES.encrypt(value, SALT).toString();
            return `${key}=${encryptedValue}`;
        }
        return line;
    });

    //Join the line and write back to env file
    const updatedEnvContent = encryptedLines.join("\n");
    const encryptedEnvFile = fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");
    console.log(encryptedEnvFile);
    console.log('Env file encrypted successfully!');
}

export function decryptEnvFile() {
    //Read env file
    const envFileContent = fs.readFileSync(envFilePath, "utf8");
    const envLines = envFileContent.split("\n");

    //Decrypt values and update array
    const decryptedLines = envLines.map(line => {
        const [key, value] = line.split('=');

        if (value) {
            const decryptedValue = CryptoJSUtil.AES.decrypt(value, SALT).toString(CryptoJSUtil.enc.Utf8);
            return `${key}=${decryptedValue}`;
        }
        return line;
    });

    //Join the line and write back to env file
    const updatedEnvContent = decryptedLines.join("\n");
    const decryptedEnvFile = fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");
    console.log(decryptedEnvFile);
    console.log('Env file decrypted successfully!');

}