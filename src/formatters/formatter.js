import json from "./json.js";
import plain from "./plain.js";
import stylish from "./stylish.js";

const formatter = (format = "stylish") => {
  switch (format) {
    case "plain":
      return plain;
    case "stylish":
      return stylish;
    case "json":
      return json;

    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default formatter;
