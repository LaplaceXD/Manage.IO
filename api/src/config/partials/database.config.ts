import { registerAs } from "@nestjs/config";
import { join } from "path";

import { Config } from "@@common/constants/config";
import { DatabaseConfig } from "../config.interface";

export default registerAs(
  Config.DATABASE,
  (): DatabaseConfig => ({
    type: "postgres",
    host: process.env["DB_HOST"] || "localhost",
    port: parseInt(process.env["DB_PORT"] || "5432"),
    username: process.env["DB_USERNAME"] || "root",
    password: process.env["DB_PASSWORD"] || "root",
    database: process.env["DB_NAME"] || "",

    synchronize: false,
    entities: [
      join(__dirname, "..", "..", "database/entities/*.entity.{ts,js}"),
    ],
    logging: false,

    migrations: [join(__dirname, "..", "..", "database/migrations/*.{ts,js}")],
    migrationsRun: true,
    migrationsTableName: "_postgres_migrations",
    autoLoadEntities: true,
  })
);
