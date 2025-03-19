// формат данных (json, yaml) и формат вывода (+-). 
// формат данных (json, json) и без формата вывода.
// тест на вложенность.
// тест на второй формат вывода.

import fs, { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src';
import { isUtf8 } from 'buffer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const stylish = readFileSync(join(__dirname , '..' , '__fixtures__' , 'expected stylish.txt'), 'utf-8')

test('json + json, stylish format', () => {
    expect(gendiff('__fixtures__/file-1.json', '__fixtures__/file-2.json')).toEqual(stylish);
})