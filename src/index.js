import fs from 'fs';
import _ from 'lodash';

const genDiff = (path1, path2) => {
  const file1 = fs.readFileSync(path1, 'utf8');
  const file2 = fs.readFileSync(path2, 'utf8');
  const object1 = JSON.parse(file1);
  const object2 = JSON.parse(file2);
  const allKeys = [...new Set([...Object.keys(object1), ...Object.keys(object2)])];
  const reducer = (accumulator, currentValue) => {
    const isSimilarKey = _.has(object1, currentValue) && _.has(object2, currentValue);
    const isSimilarString = isSimilarKey && object1[currentValue] === object2[currentValue];
    const isModifiedString = isSimilarKey && !isSimilarString;
    const isDeletedString = _.has(object1, currentValue) && !_.has(object2, currentValue);
    const isAddedString = !_.has(object1, currentValue) && _.has(object2, currentValue);
    if (isSimilarString) {
      return [...accumulator, `   ${currentValue}: ${object1[currentValue]}`];
    } if (isModifiedString) {
      return [...accumulator, ` + ${currentValue}: ${object2[currentValue]}`, ` - ${[currentValue]}: ${object1[currentValue]}`];
    } if (isDeletedString) {
      return [...accumulator, ` - ${currentValue}: ${object1[currentValue]}`];
    } if (isAddedString) {
      return [...accumulator, ` + ${currentValue}: ${object2[currentValue]}`];
    }
    return accumulator;
  };
  const differenceStrings = allKeys.reduce(reducer, []);
  const resultString = differenceStrings.join('\n');
  const result = `{\n${resultString}\n}`;
  console.log(result);
  return result;
};
export default genDiff;
