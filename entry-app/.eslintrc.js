module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'max-len': ['error', {
      code: 120,
    }],

    'global-require': 'off',
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'consistent-return': 'off',
    'one-var': 'off',
    'no-shadow': 'off',
    'dot-notation': 'off',
    'no-continue': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
