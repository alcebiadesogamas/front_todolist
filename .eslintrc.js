module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'no-use-before-define': 'off',
    'comma-dangle': 'off',
    semi: 'off',
    'multiline-ternary': 'off',
    camelcase: 'off',
    'space-before-function-paren': 'off',
    'no-unused-vars': 'off',
  },
};
