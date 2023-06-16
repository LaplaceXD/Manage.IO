import { Logger, RequestMethod, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import compression from "compression";
import helmet from "helmet";

import { Config, Environment } from "@@common/constants";
import { Swagger, logger, requestLogger } from "@@common/services";
import { AppConfig, CorsConfig } from "@@config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
  app.setGlobalPrefix("api", {
    exclude: [
      { path: "health", method: RequestMethod.GET },
      { path: "ping", method: RequestMethod.GET },
    ],
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  // Register documentation
  Swagger.register(app);

  // Register security and compression
  const config = app.get(ConfigService);
  app.use(compression(), helmet(), requestLogger);
  app.enableCors(config.getOrThrow<CorsConfig>(Config.CORS));

  const appConfig = config.getOrThrow<AppConfig>(Config.APP);
  await app.listen(appConfig.port);
  const url =
    appConfig.env === Environment.PRODUCTION
      ? await app.getUrl()
      : "http://localhost:" + appConfig.port;

  Logger.log(`Running on '${appConfig.env}' environment.`);
  Logger.log(`Application is listening at: ${url}`);
}
bootstrap();
