import _ from 'lodash';

const formatValue = (value) => {
    if(typeof value === 'string') {
        return `'${value}'`;
    }
    if(_.isObject(value)) {
        return '[complex value]';
    } 
    return value;
}

const plain = (data, path = '') => {
    const result = data.map((keyInfo) => {
        const type = keyInfo.type;
        
        const key = `${path}${path !== ''? '.':''}${keyInfo.key}`; 
        
        switch (type) {
            case 'added':
                return `Property '${key}' was added with value: ${formatValue(keyInfo.value)}`;
                
            case 'deleted':
                return `Property '${key}' was removed`;
                
            case 'unchanged':
                return null;

            case 'updated':
                return `Property '${key}' was updated. From ${formatValue(keyInfo.value)} to ${formatValue(keyInfo.value2)}`;

            case 'nested':
                return plain(keyInfo.value, key );

            default:
                return null;
        }
    }).filter(Boolean);
    return result.join('\n');
};

export default plain;