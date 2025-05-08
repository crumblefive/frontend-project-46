import fs from "fs";
import path from "path";
import formatter from "./formatter.js";
import parser from "../parser.js";
import compare from "../compare.js";

const getFileData = (filepath) => {
  const file = fs.readFileSync(filepath);
  const parts = filepath.split(".");
  const extention = parts[parts.length - 1];
  return { file, extention };
};

const genDiff = (filepath1, filepath2, options) => {
  const fileData1 = getFileData(path.resolve(filepath1));
  const fileData2 = getFileData(path.resolve(filepath2));

  const obj1 = parser(fileData1.file, fileData1.extention);
  const obj2 = parser(fileData2.file, fileData2.extention);

  const result = compare(obj1, obj2);
  const finalResult = formatter(options)(result);
  return finalResult;
};

export default genDiff;
