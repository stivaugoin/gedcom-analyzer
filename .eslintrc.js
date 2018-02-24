module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  parser: "babel-eslint",
  plugins: ["react", "prettier"],
  extends: ["eslint-config-airbnb", "prettier"],
  rules: { "prettier/prettier": "error" },
};
