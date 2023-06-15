import { Environment } from "@common/constants";
import { Config } from "./config.interface";

const environment =
  process.env["NODE_ENV"] &&
  process.env["NODE_ENV"].toLowerCase() === Environment.PRODUCTION
    ? Environment.PRODUCTION
    : Environment.DEVELOPMENT;

const config: Config = {
  nest: {
    port: parseInt(process.env["PORT"] || "3000", 10),
    env: environment,
  },
  cors: {
    origin: process.env["CORS_ORIGIN"] ?? "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "Access-Control-Allow-Headers",
    ],
  },
  swagger: {
    enabled: environment !== Environment.PRODUCTION,
    title: "My Author's Perspective API",
    description:
      "Playground for the basic endpoints of My Author's Perspective",
    version: "0.1",
    endpoint: "swagger",
  },
};

export * from "./config.interface";
export default () => config;
