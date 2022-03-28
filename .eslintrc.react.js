module.exports = {
  rules: {
    "jsx-a11y/label-has-associated-control": "warn",
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
  },
  globals: {
    JSX: true,
    React: true,
    window: true,
    document: true,
    test: true,
    expect: true,
    localStorage: true,
  },
};
