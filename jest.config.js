const path = require('path');

module.exports = {
  globalSetup: path.join(__dirname, 'jestglobalsetup.js'),
  setupFiles: [
    'raf/polyfill',
    path.join(__dirname, 'jestsetup.js'),
  ],
  testMatch: [
    path.join(process.cwd(), '**', 'jest', '**', '(*.)(spec|test).js?(x)'),
  ],
  roots: [process.cwd()],
  snapshotSerializers: [
    path.join(__dirname, 'node_modules', 'enzyme-to-json', 'serializer'),
  ],
  moduleNameMapper: {
    '\\.(svg|jpg|png|md)$': path.join('fileMock.js'),
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  moduleDirectories: [
    'aggregated-translations',
    'node_modules',
  ],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': path.join(__dirname, 'jestBabelTransform'),
  },
};
