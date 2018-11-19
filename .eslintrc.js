const status = process.env.NODE_ENV === 'production' ? 'error' : 'off';

module.exports = {
  root: true,
  env: {
    // 此项指定环境的全局变量
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': status,
    'no-debugger': status,
    'no-plusplus': 'off',
    'semi': [ 'error', 'always' ],
    'comma-dangle': [ 'error', {
      arrays: 'never',
      objects: 'always',
      imports: 'always',
      exports: 'always',
      functions: 'never',
    }],
    'comma-spacing': [ 'error', {
      before: false,
      after: true,
    }],
    'array-bracket-spacing': [ 'error', 'always', {
      singleValue: false,
      objectsInArrays: false,
      arraysInArrays: false,
    }],
    'max-len': [ 'error', {
      code: 120,
    }],
    'import/no-extraneous-dependencies': [ 'error', {
      devDependencies: true,
    }],
    'quote-props': [ 'error', 'consistent' ],
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'one-var': 'off',
    'no-continue': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'class-methods-use-this': 'off',
    'vue/valid-v-for': 'off',
    'one-var-declaration-per-line': 'off',
    'prefer-promise-reject-errors': 'off',
  },
  parserOptions: {
    // 此项是用来指定eslint解析器的，解析器必须符合规则，
    // babel-eslint解析器是对babel解析器的包装使其与ESLint解析
    parser: 'babel-eslint',
  },
};
