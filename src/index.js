import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import _ from 'lodash';

const operation = {
    added: 'added',
    deleted: 'deleted',
    updated: 'updated',
    unchanged: 'unchanged',
    nested: 'nested',
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

if (extention === 'yaml' || extention === 'yml') {
    return yaml.load(file);
}
};

const compare = (obj1, obj2) => {
    const keys = _.union(Object.keys(obj1), Object.keys(obj2));
    const sortedKeys = _.sortBy(keys);

    const result = sortedKeys.map((key) => {
        const value1 = obj1[key];
        const value2 = obj2[key];

        if(_.isObject(value1) && _.isObject(value2)){
            return {value: compare(value1, value2) , type: operation.nested, key};
        }
        
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

const toStr = (value, count) => {
    const tab = '    '.repeat(count + 2);
    
    if (!_.isObject(value)) {
        return value;
    }
    const lines = Object.keys(value).map((key) => {
       return `${tab}${key}: ${toStr(value[key], count + 1)}`
    })
    return `{\n${lines.join('\n')}\n${tab}}`
    
}

const stylish = (data , count = 0) => {
    const tab = '    '.repeat(count);   
    const result = data.map((keyInfo) => {
    const type = keyInfo.type; 
    switch (type){
        case 'added': 
        return tab + `  + ${keyInfo.key}: ${toStr(keyInfo.value, count)}`;
        
        case 'deleted': 
        return tab + `  - ${keyInfo.key}: ${toStr(keyInfo.value, count)}`;

        case 'unchanged': 
        return tab + `    ${keyInfo.key}: ${toStr(keyInfo.value, count)}`;

        case 'updated': 
        return tab + `  - ${keyInfo.key}: ${toStr(keyInfo.value, count)}\n${tab}  + ${keyInfo.key}: ${toStr(keyInfo.value2, count)}`;

        case 'nested': 
        return stylish(keyInfo.value, count +1);

        default: 
        return null; 
        break;
    }}

).filter(Boolean);
return `${tab}{\n${result.join('\n')}\n${tab}}`
}

const plain = (data, count = 0) => {
    const result = data.map((keyInfo) => {
        const type = keyInfo.type;
        switch (type) {
            case 'added':
                return `Property '${keyInfo.key}' was added with value: ${keyInfo.value}`;
                
            case 'deleted':
                return `Property '${keyInfo.key}' was removed`;
                
            case 'unchanged':
                return null;

            case 'updated':
                return `Property '${keyInfo.key}' was updated. From '${keyInfo.value}' to '${keyInfo.value2}'`;

            case 'nested':
                return plain(keyInfo.value, count + 1);

            default:
                return null;
        }
    }).filter(Boolean);

    return result.join('\n');
};
const json = (data) => JSON.stringify(data);

const formatData = (data, format) => {
    switch(format) {
        case 'plain':
            return plain(data);
        case 'stylish':
            return stylish(data);
        case 'json':
            return json(data);
        
        default: throw new Error (`Unknown format: ${format}`)
    }
};

const gendiff = (filepath1, filepath2, options) => {
    const fileData1 = getFileData(path.resolve(filepath1));
    const fileData2 = getFileData(path.resolve(filepath2));

    const obj1 = parser(fileData1.file , fileData1.extention);
    const obj2 = parser(fileData2.file , fileData2.extention);

    const result = compare(obj1, obj2);
    const finalResult = formatData(result, options);
    return finalResult;
}

export default gendiff;