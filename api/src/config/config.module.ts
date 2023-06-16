import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { app, cors, database, security, swagger } from "./partials";

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [app, cors, database, security, swagger],
    }),
  ],
})
export class ConfigModule {}
