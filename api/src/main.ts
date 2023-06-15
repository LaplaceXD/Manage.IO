import { Logger, RequestMethod, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import compression from "compression";
import helmet from "helmet";

import { Environment } from "@common/constants";
import { logger, requestLogger, Swagger } from "@common/services";
import { CorsConfig, NestConfig } from "@config";
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
  app.enableCors(config.getOrThrow<CorsConfig>("cors"));

  const nestConfig = config.getOrThrow<NestConfig>("nest");
  await app.listen(nestConfig.port);
  const url =
    nestConfig.env === Environment.PRODUCTION
      ? await app.getUrl()
      : "http://localhost:" + nestConfig.port;

  Logger.log(`Running on '${nestConfig.env}' environment.`);
  Logger.log(`Application is listening at: ${url}`);
}
bootstrap();
