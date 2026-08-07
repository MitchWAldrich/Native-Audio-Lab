module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!((@)?react-native|react-native-gesture-handler|react-native-worklets)/)',
  ],
  setupFiles: ['react-native-gesture-handler/jestSetup.js'],
};
