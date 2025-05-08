// формат данных (json, yaml) и формат вывода (+-). 
// формат данных (json, json) и без формата вывода.
// тест на вложенность.
// тест на второй формат вывода.

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const stylishExpectedResult = readFileSync(join(__dirname , '..' , '__fixtures__' , 'expected stylish.txt'), 'utf-8');
const plainExpectedResult = readFileSync(join(__dirname , '..' , '__fixtures__' , 'expected plain.txt'), 'utf-8');
const JSONExpectedResult = readFileSync(join(__dirname , '..' , '__fixtures__' , 'expected JSON.txt'), 'utf-8');

test('json + json, stylish format', () => {
    expect(gendiff('__fixtures__/file-1.json', '__fixtures__/file-2.json')).toEqual(stylishExpectedResult);
})

test('yaml + yaml, plain format', () => {
    expect(gendiff('__fixtures__/file-1.yaml', '__fixtures__/file-2.yaml', 'plain')).toEqual(plainExpectedResult);
})

test('json + yaml, JSON format', () => {
    expect(gendiff('__fixtures__/file-1.json', '__fixtures__/file-2.yaml', 'json')).toEqual(JSONExpectedResult);
})






