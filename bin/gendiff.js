#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-v, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action(() => {
    const options = program.opts();
    console.log(options);
  });
program.parse();
