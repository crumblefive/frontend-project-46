import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import _ from 'lodash';

const operation = {
    added: 'added',
    deleted: 'deleted',
    updated: 'updated',
    unchanged: 'unchanged'
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
            return {key, value: value1, type: operation.unchanged};
        }
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            return {key, value: value1, value2: value2, type: operation.updated};
        }
        if (obj1.hasOwnProperty(key)) {
            return {key, value: value1, type: operation.deleted};
        }
        return {key, value: value2, type: operation.added};
    });

    return result;
};

const json = (data) => {
    const result = data.map((keyInfo) => {
    const type = keyInfo.type;    
    switch (type){
        case 'added': 
        return ` + ${keyInfo.key}: ${keyInfo.value}`;
        break;

        case 'deleted': 
        return ` - ${keyInfo.key}: ${keyInfo.value}`;
        break; 

        case 'updated': 
        return `   ${keyInfo.key}: ${keyInfo.value2}`;
        break;

        default: 
        return null; 
        break;
    }}

).filter(Boolean);
return `{\n${result.join('\n')}\n}`
}
 

const gendiff = (filepath1, filepath2, options) => {
    const fileData1 = getFileData(path.resolve(filepath1));
    const fileData2 = getFileData(path.resolve(filepath2));

    const obj1 = parser(fileData1.file , fileData1.extention);
    const obj2 = parser(fileData2.file , fileData2.extention); 
    const data = compare (obj1 , obj2)
    return json(compare (obj1 , obj2)); 
}

export default gendiff; 
