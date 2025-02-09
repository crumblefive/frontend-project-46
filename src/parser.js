import yaml from 'js-yaml';

const parser = (file, extention) => {
    if (extention === 'json'){
        return JSON.parse(file);
        }
    
    if (extention === 'yaml' || extention === 'yml'){
        return yaml.load(file);
        }
    };

export default parser;