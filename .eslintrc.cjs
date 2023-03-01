/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  globals: {
    'RequestHttp': true,
    'bestime': true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    "camelcase": "error", // 驼峰命名
    "eqeqeq": "warn", // 使用全等 === 或 !==
    "no-return-await": "error", // 禁用不必要的 return await
    "no-sequences": "error", // 禁用逗号操作符
    "no-self-compare": "error", // 禁止自身比较
    "no-use-before-define": "error", // 禁止在变量定义之前使用它们
    "no-var": "error", // 不允许使用var
    "no-multi-assign": "error", // 禁止连续赋值
    "no-nested-ternary": "error", // 禁止使用嵌套的三元表达式
    "vue/multi-word-component-names": "off", // vue组件名必须两个单词组成
  }
};
