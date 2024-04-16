/* eslint-env node */
module.exports = {
  root: true,
  "extends": [
    "plugin:vue/vue3-strongly-recommended",
    "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "vue/multi-word-component-names": 0,
    "vue/no-child-content": 0
  }
}