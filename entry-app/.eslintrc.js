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

    'no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'none',
      'ignoreRestSiblings': false
    }],

    'global-require': 'off',
    'arrow-parens': [
      'error', 'as-needed'
    ],
    'prefer-destructuring': ['error', {
      'object': true, 'array': false
    }],
    'import/extensions': 'off',
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
