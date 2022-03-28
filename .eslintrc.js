module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "./.eslintrc.react.js",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "prettier",
    "prettier/prettier",
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".tsx", ".json"],
      },
    },
  },
  rules: {
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "class-methods-use-this": 0,
    "no-underscore-dangle": 0,
    "comma-dangle": 0,
    "max-classes-per-file": 0,
    "no-console": 0,
    "react/jsx-props-no-spreading": "off",
    "no-shadow": "off",
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    "jsx-a11y/label-has-associated-control": "warn",
    "default-param-last": "off",
    "no-param-reassign": "off",
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-shadow": ["error"],
    // "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    quotes: [
      2,
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    // "prettier/prettier": [
    //   "error",
    //   {
    //     trailingComma: "es5",
    //     printWidth: 80,
    //     endOfLine: "auto",
    //   },
    // ],
  },
};
