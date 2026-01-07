module.exports = {
  root: true,
  extends: [
    '@react-native/eslint-config',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // General
    'no-console': 'warn',
    'prefer-const': 'error',

    // React
    'react/react-in-jsx-scope': 'off',

    // React Native
    'react-native/no-inline-styles': 'warn',
    'react-native/no-unused-styles': 'error',

    // TypeScript
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
