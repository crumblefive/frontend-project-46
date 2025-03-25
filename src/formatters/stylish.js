import _ from 'lodash';

const toStr = (value, count) => {
    const tab = '    '.repeat(count + 2);
    
    if (!_.isObject(value)) {
        return value;
    }
    const lines = Object.keys(value).map((key) => {
       return `${tab}${key}: ${toStr(value[key], count + 1)}`; 
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
            return `${tab}${keyInfo.key}: ${stylish(keyInfo.value, count +1)}`;

        default: 
            return null; 
    }
}
).filter(Boolean);

console.log(`${tab}{\n${result.join('\n')}\n${tab}}`);
return `${tab}{\n${result.join('\n')}\n${tab}}`
};

export default stylish;