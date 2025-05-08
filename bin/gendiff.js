#!/usr/bin/env node
import { Command } from "commander";
import genDiff from "../src/formatters/index.js";

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .argument("<filepath1>")
  .argument("<filepath2>")
  .option("-v, --version", "output the version number")
  .option("-f, --format <type>", "output format", "stylish")
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const result = genDiff(filepath1, filepath2, options.format);
    console.log(result);
  });

program.parse();
