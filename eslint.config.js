import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
<<<<<<< HEAD
=======
  {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
>>>>>>> abd4c952d86068e2ca60249190abb60c6a7ffecc
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
];