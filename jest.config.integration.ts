import baseConfig from "./jest.config"
import { type Config } from "jest";

const config: Config = {
  ...baseConfig,
  testRegex: ".*\\.integration\\.spec\\.ts$",
}

export default config;