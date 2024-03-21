module.exports = {
  root: true,
  extends: ['airbnb-typescript-prettier'],
  ignorePatterns: ['build', '.eslintrc.cjs'],
  plugins: ['react-refresh', 'simple-import-sort'],
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/react-in-jsx-scope': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'react/jsx-props-no-spreading': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react-refresh/only-export-components': 0
  }
};
