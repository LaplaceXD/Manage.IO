import { registerAs } from "@nestjs/config";

import { Config } from "@@common/constants/config";
import { CorsConfig } from "../config.interface";

export default registerAs(
  Config.CORS,
  (): CorsConfig => ({
    origin: process.env["CORS_ORIGIN"] ?? "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "Access-Control-Allow-Headers",
    ],
  })
);
