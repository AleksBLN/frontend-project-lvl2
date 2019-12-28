#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';

const program = commander;
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<pathToFirstFile> <pathToSecondFile>')
  .action((pathToFirstFile, pathToSecondFile) => {
    genDiff(pathToFirstFile, pathToSecondFile);
  });

program.parse(process.argv);
