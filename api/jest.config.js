module.exports = {
  testEnvironment: "node",
  testRegex: ".*\\.spec\\.ts$",
  rootDir: "src",

  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",

  moduleFileExtensions: ["js", "json", "ts"],
  moduleNameMapper: {
    "^@@(.*)$": "<rootDir>/$1",
  },

  clearMocks: true,
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
};
