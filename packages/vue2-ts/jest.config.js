module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
    'ts',
    'tsx'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tencent/ppd-base-libs': '<rootDir>/node_modules/@tencent/ppd-base-libs'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  transformIgnorePatterns: [
    // Change MODULE_NAME_HERE to your module that isn't being compiled
    '/node_modules/(?!@tencent/ppd-base-libs).+\\.js$'
  ],
  modulePathIgnorePatterns:[
    'mp'
  ],
  testURL: 'http://localhost/',
  setupFiles: ["<rootDir>/jest.setup.js"],
  coveragePathIgnorePatterns: [
    'e2ee|crypt-hk|hongbao-vc|view-controller/proxy|utf8-16|window-helper|business/error|view-controller/error|base-vc|discount'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/{business|api|config|utils|views}/**.{js|ts}',
    '**/src/views/**.{vue}',
    '!**/node_modules/**'
  ],
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  }
};
