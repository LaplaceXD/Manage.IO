import { registerAs } from "@nestjs/config";

import { Config, Environment } from "@@common/constants";
import { AppConfig } from "../config.interface";

export default registerAs(
  Config.APP,
  (): AppConfig => ({
    port: parseInt(process.env["PORT"] ?? "3000"),
    env:
      process.env["NODE_ENV"] &&
      process.env["NODE_ENV"].toLowerCase() === Environment.PRODUCTION
        ? Environment.PRODUCTION
        : Environment.DEVELOPMENT,
  })
);
