import fs from 'fs';
import gendiff from '../src';

const path1 = `${__dirname}/../__fixtures__/before.json`;
const path2 = `${__dirname}/../__fixtures__/after.json`;
const pathToExpected = `${__dirname}/../__fixtures__/expected`;
test('gendiff', () => {
  expect(gendiff(path1, path2)).toEqual(fs.readFileSync(pathToExpected, 'utf8').trim());
});
