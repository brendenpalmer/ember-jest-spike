module.exports = {
  preset: "jest-puppeteer",
  globals: {
    PATH: "http://localhost:4200/test",
  },
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  globalSetup: "<rootDir>/jest-setup.js",
  testEnvironment: "./custom-environment.js",
  testMatch: ["**/*.test.js"],
};
