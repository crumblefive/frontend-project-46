import fs from 'fs';
import yaml from 'js-yaml';
import { concat } from 'lodash';
import path from 'path';

const getFileData = (filepath) => {
const file = fs.readFileSync(filepath);
const parts = filepath.split('.');
const extention = parts[parts.length - 1];
return { file , extention };
};

const parser = (file, extention) => {
if (extention === 'json'){
    return JSON.parse(file);
}

if (extention === 'yaml') {
    return yaml.load(file);
}
};

const compair = (obj1 , obj2) => {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    const keys = obj1Keys.concat(obj2Keys);
    const unicKeys = new Set(keys);

    const result = {};

    for (const key of unicKeys) {
        const value1 = obj1[key];
        const value2 = obj2[key];

        if (value1 === value2) {
            result[key] = {};
        }
    }
}
const gendiff = (filepath1, filepath2, options) => {
    const fileData1 = getFileData(path.resolve(filepath1));
    const fileData2 = getFileData(path.resolve(filepath2));

    const obj1 = parser(fileData1.file , fileData1.extention);
    const obj2 = parser(fileData2.file , fileData2.extention); 
    console.log(obj1 , obj2); 
}

export default gendiff; 
