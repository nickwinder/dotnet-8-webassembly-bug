const config = {
  rootDir: "../",
  modulePaths: [
    "<rootDir>/node_modules"
  ],
  testRegex: "tests\\/.*\\-test\\.js$",
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/"],
  globals: {
    BASE_URL: "../WasmStripBug/WasmStripBug/bin/Release/net8.0/browser-wasm/AppBundle/"
  },
  moduleNameMapper: {
    "wasmStripBug/(.*)$": "<rootDir>/../WasmStripBug/WasmStripBug/bin/Release/net8.0/browser-wasm/AppBundle/$1",
  },
};

export default config