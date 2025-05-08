import _ from 'lodash';


const formTab = (depth, num = 2) => {
    return ' '.repeat(4 * depth - num ); 
}

const formLine = (count, cb, key, value, sign) => {
    return (`${formTab(count)}${sign} ${key}: ${cb(value, count +1)}`)

}

const toStr = (value, count = 0) => {
    const tab = '    '.repeat(count);
    
    if (!_.isObject(value)) {
        return value;
    } 

    const lines = Object.keys(value).map((key) => {
       return `${tab}${key}: ${toStr(value[key], count + 1)}`; 
    })
    return `{\n${lines.join('\n')}\n${formTab(count, 4)}}`
    
}

const stylish = (data , count = 1) => {
    const result = data.map((keyInfo) => {
    const type = keyInfo.type; 
    switch (type){
        case 'added': 
            return formLine(count, toStr, keyInfo.key, keyInfo.value, '+');    
        
        case 'deleted': 
            return formLine(count, toStr, keyInfo.key, keyInfo.value, '-');

        case 'unchanged': 
            return formLine(count, toStr, keyInfo.key, keyInfo.value, ' ');;

        case 'updated': 
            return `${formLine(count, toStr, keyInfo.key, keyInfo.value, '-')}\n${formLine(count, toStr, keyInfo.key, keyInfo.value2, '+')}`;

        case 'nested': 
            return formLine(count, stylish, keyInfo.key, keyInfo.value, ' ');

        default: 
            return null; 
    }
}
).filter(Boolean);

// console.log(data); 
// `${tab}{\n${result.join('\n')}\n${tab}}`
return `{\n${result.join('\n')}\n${formTab(count, 4)}}`
};

export default stylish;