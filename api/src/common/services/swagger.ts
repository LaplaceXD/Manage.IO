import { SwaggerConfig } from "@config";
import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

class Swagger {
  static register(app: INestApplication) {
    const configService = app.get(ConfigService);

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
  }
}

export default Swagger;
