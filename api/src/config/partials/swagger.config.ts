import { registerAs } from "@nestjs/config";

import { Config, Environment } from "@common/constants";
import { SwaggerConfig } from "../config.interface";

export default registerAs(
  Config.SWAGGER,
  (): SwaggerConfig => ({
    enabled: process.env["NODE_ENV"] !== Environment.PRODUCTION,
    title: "My Author's Perspective API",
    description:
      "Playground for the basic endpoints of My Author's Perspective",
    version: "0.1",
    endpoint: "swagger",
  })
);
