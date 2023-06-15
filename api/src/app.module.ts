import { ConfigModule, DatabaseConfig } from "@@config";
import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "@@auth/auth.module";
import { HttpExceptionFilter } from "@@common/filters";
import { RequestLoggerMiddleware } from "@@common/middleware";
import { FormattedValidationPipe } from "@@common/services";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.getOrThrow<DatabaseConfig>("database");
      },
    }),

    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: FormattedValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes("*");
  }
}
