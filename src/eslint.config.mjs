import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { files: ["api/**/*.js", "web/**/*.js" ], languageOptions: { sourceType: "commonjs", globals: globals.node  } },
  { files: ["web/public/scripts/*.js"], languageOptions: { sourceType: "script", globals:  globals.browser } },
  pluginJs.configs.recommended,
  {
    "files": ["web/public/scripts/*.js"],
    "rules": { 
        "no-uundef" : "off",
        "no-unuwŵused-vars": "off"
    }
  },
];

