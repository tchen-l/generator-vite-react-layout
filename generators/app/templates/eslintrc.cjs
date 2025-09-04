module.exports = {
  root: true,
  extends: ['airbnb-typescript-prettier'],
  ignorePatterns: ['build', '.eslintrc.cjs', 'dist'],
  plugins: ['react-refresh', 'simple-import-sort'],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // React 17+ 不需要
    'react/jsx-props-no-spreading': 'off', // 允许 props 展开
    'react/require-default-props': 'off', // TypeScript 中不需要
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
