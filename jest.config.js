export default {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/test/palindrome.test.js'], // Ignora este archivo
};
