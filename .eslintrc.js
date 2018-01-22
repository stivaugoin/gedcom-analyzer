module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    "react"
  ],
  extends: [
    "eslint-config-classcraft",
  ],
  env: {
    "browser": true
  },
  globals: {
    "server": false,
    "browser": false,
    "expect": false
  },
  rules: {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "function-paren-newline": 0
  }
};
