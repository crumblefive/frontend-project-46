import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import _ from 'lodash';

const data1 = {
    added: '+',
    deleted: '-',
}

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

const compare = (obj1, obj2) => {
    const keys = _.union(Object.keys(obj1), Object.keys(obj2));
    const sortedKeys = _.sortBy(keys);

    const result = sortedKeys.map((key) => {
        const value1 = obj1[key];
        const value2 = obj2[key];

        if (value1 === value2) {
            return null;
        }
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
        }
        if (obj1.hasOwnProperty(key)) {
            return `  - ${key}: ${value1}`;
        }
        return `  + ${key}: ${value2}`; 
    }).filter(Boolean);

    return `{\n${result.join('\n')}\n}`;
};

const gendiff = (filepath1, filepath2, options) => {
    const fileData1 = getFileData(path.resolve(filepath1));
    const fileData2 = getFileData(path.resolve(filepath2));

    const obj1 = parser(fileData1.file , fileData1.extention);
    const obj2 = parser(fileData2.file , fileData2.extention); 
    return compare (obj1 , obj2); 
}

export default gendiff; 
