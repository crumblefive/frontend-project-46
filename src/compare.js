import _ from 'lodash';

const operation = {
  added: 'added',
  deleted: 'deleted',
  updated: 'updated',
  unchanged: 'unchanged',
  nested: 'nested',
};

const compare = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return { value: compare(value1, value2), type: operation.nested, key };
    }

    if (value1 === value2) {
      return { key, value: value1, type: operation.unchanged };
    }
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      return { key, value: value1, value2: value2, type: operation.updated };
    }
    if (obj1.hasOwnProperty(key)) {
      return { key, value: value1, type: operation.deleted };
    }
    return { key, value: value2, type: operation.added };
  });

  return result;
};
export default compare;
