import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";


export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      "vue/no-child-content": 0
    }
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
];