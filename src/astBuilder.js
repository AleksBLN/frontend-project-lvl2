import _ from 'lodash';
// import parse from './parsers';


const getUniqKeys = (obj1, obj2) => [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])];
const getAst = (object1, object2) => {
  const uniqKeys = getUniqKeys(object1, object2);
  return uniqKeys.map((key) => {
    if (_.has(object1, key) && !_.has(object2, key)) {
      const node = {
        name: key,
        value: object1[key],
        state: 'deleted',
      };
      return node;
    } if (_.has(object2, key) && !_.has(object1, key)) {
      const node = {
        name: key,
        value: object2[key],
        state: 'added',
      };
      return node;
    } if (typeof object1[key] === 'object' && typeof object2[key] === 'object') {
      const node = {
        name: key,
        children: getAst(object1[key], object2[key]),
        state: 'goDeeper',
      };
      return node;
    } if (object1[key] === object2[key]) {
      const node = {
        name: key,
        value: object1[key],
        state: 'unmodified',
      };
      return node;
    }
    const node = {
      name: key,
      value: object2[key],
      oldValue: object1[key],
      state: 'modified',
    };
    return node;
  });
};
export default getAst;
