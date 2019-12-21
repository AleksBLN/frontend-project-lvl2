#!/usr/bin/env node
import commander from 'commander';

const program = commander;
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<pathToFirstFile> <pathToSecondFile>')
  .action((pathToFirstFile, pathToSecondFile) => {
    const path1 = pathToFirstFile;
    const path2 = pathToSecondFile;
    console.log(path1, path2);
  });

program.parse(process.argv);
