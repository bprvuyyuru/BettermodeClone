// jest.config.cjs
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS modules
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/__mocks__/fileMock.js", // Mock image files
  },
  transformIgnorePatterns: [
    "/node_modules/", // Ignore node_modules by default
  ],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.jest.json", // Use Jest-specific tsconfig
    },
  },
};
