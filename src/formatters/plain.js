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

export default plain;