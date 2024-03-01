import { type Config } from "jest";

const config: Config = {
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  rootDir: ".",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  testEnvironment: "node",
  roots: [
    "<rootDir>/src/"
  ],
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  setupFiles: ["./src/preStart.ts"]
}

export default config;