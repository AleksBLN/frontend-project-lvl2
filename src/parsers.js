import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (pathToFile) => {
  const file = fs.readFileSync(pathToFile, 'utf8');
  if (path.extname(pathToFile) === '.yml') {
    return yaml.safeLoad(file);
  } if (path.extname(pathToFile) === '.json') {
    return JSON.parse(file);
  }
  return ini.parse(file);
};
