module.exports = {
  plugins: ["prettier", "typescript"],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  rules: { "prettier/prettier": "error" },
  ignorePatterns: ['.eslintrc.js'],
};
