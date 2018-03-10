module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  parser: "babel-eslint",
  plugins: ["react", "prettier"],
  extends: ["eslint-config-airbnb", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["to"],
      },
    ],
  },
  env: {
    browser: true,
    node: true,
  },
};
