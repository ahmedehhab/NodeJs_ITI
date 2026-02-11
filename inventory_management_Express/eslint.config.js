import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs}"], 
    languageOptions: { 
      globals: {
        ...globals.node,
        ...globals.browser 
      } 
    },
    rules: {
      ...js.configs.recommended.rules, 
      "no-console": "off", 
      "prefer-const": "error", 
      "eqeqeq": ["error", "always"],
      "no-var": "error",
      "indent": ["error", 2],
      "semi": ["error", "always"]
    },
  },
];