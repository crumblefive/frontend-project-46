import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

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

export default formatData;