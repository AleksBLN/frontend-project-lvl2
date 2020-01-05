import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (pathToFile) => {
  const file = fs.readFileSync(pathToFile, 'utf8');
  return (path.extname(pathToFile) === '.yml') ? yaml.safeLoad(file) : JSON.parse(file);
};
