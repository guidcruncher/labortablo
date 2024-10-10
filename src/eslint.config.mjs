import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { files: ["**/*.js", "web/**/*.js" ], languageOptions: { sourceType: "commonjs", globals: globals.node  } },
  { files: ["public/scripts/*.js"], languageOptions: { sourceType: "script", globals:  globals.browser } },
  { ignores: [
      "Gruntfile.js",
      "eslint.config.mjs",
      "/**/public/*",
      "public/",
      "/**/node_modules/*",
      "node_modules/" 
    ]
  },
  pluginJs.configs.recommended,
  {
    "files": ["public/scripts/*.js"],
    "rules": { 
        "no-undef" : "off",
        "no-unused-vars": "off"
    }
  },
];

