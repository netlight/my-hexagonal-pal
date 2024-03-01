import baseConfig from "./jest.config"
import { type Config } from "jest";

const config: Config = {
  ...baseConfig,
  testRegex: ".*\\.unit\\.spec\\.ts$",
}

export default config;