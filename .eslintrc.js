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
    "eslint-config-airbnb",
    "prettier"
  ],
  env: {
    "browser": true
  },
  globals: {
    "server": false,
    "browser": false,
    "expect": false
  }
};
