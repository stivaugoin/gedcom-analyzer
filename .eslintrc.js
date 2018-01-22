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
    "react/jsx-indent": [2, "tab"],
    "react/jsx-indent-props": [2, "tab"],
    "quotes": ["error", "single"],
    "function-paren-newline": 0
  }
};
