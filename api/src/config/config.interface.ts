import { Environment } from "@common/constants";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export interface Config {
  nest: NestConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  security: SecurityConfig;
}

export interface NestConfig {
  port: number;
  env: Environment;
}

export interface CorsConfig extends CorsOptions {
  enabled?: boolean;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  endpoint: string;
}

export interface SecurityConfig {
  saltRounds: number;
}
