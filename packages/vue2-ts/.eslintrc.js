module.exports = {
  extends: ['@tencent/eslint-config-tencent', '@tencent/eslint-config-tencent/ts'],
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'new-cap': 0,
    quotes: [1, 'single'],
    'function-paren-newline': ['error', 'multiline-arguments'],
  },
};
