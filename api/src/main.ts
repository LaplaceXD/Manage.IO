import { Logger, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import compression from "compression";
import helmet from "helmet";

import { Environment } from "@common/constants";
import { logger, requestLogger } from "@common/services";
import { CorsConfig, NestConfig, SwaggerConfig } from "@config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
  const configService = app.get(ConfigService);
  const appConfig = configService.getOrThrow<NestConfig>("nest");

  app.setGlobalPrefix("api", { exclude: ["health", "ping", "swagger"] });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  // Apply documentation on non-production environment
  const swaggerConfig = configService.getOrThrow<SwaggerConfig>("swagger");
  if (swaggerConfig.enabled) {
    const config = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(swaggerConfig.endpoint, app, document);
  }

  // Apply security and compression
  app.use(compression());
  app.use(helmet());
  app.use(requestLogger);
  app.enableCors(configService.getOrThrow<CorsConfig>("cors"));

  await app.listen(appConfig.port);
  const url =
    appConfig.env === Environment.PRODUCTION
      ? await app.getUrl()
      : "http://localhost:" + appConfig.port;

  Logger.log(`Running on '${appConfig.env}' environment.`);
  Logger.log(`Application is listening at: ${url}`);
}
bootstrap();
