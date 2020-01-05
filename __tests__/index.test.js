import fs from 'fs';
import gendiff from '../src';

const beforeJson = `${__dirname}/../__fixtures__/before.json`;
const afterJson = `${__dirname}/../__fixtures__/after.json`;
const beforeYml = `${__dirname}/../__fixtures__/before.yml`;
const afterYml = `${__dirname}/../__fixtures__/after.yml`;
const pathToExpected = `${__dirname}/../__fixtures__/expected`;
test('gendiff JSON', () => {
  expect(gendiff(beforeJson, afterJson)).toEqual(fs.readFileSync(pathToExpected, 'utf8').trim());
});
test('gendiff yaml', () => {
  expect(gendiff(beforeYml, afterYml)).toEqual(fs.readFileSync(pathToExpected, 'utf8').trim());
});
