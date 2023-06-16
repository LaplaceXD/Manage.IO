import dotenv from "dotenv";
import { join } from "path";
import { DataSource } from "typeorm";

dotenv.config();
export default new DataSource({
  type: "postgres",
  host: process.env["DB_HOST"] || "localhost",
  port: parseInt(process.env["DB_PORT"]!),
  username: process.env["DB_USERNAME"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_NAME"],

  synchronize: false,
  entities: [join(__dirname, "entities/*.entity.{ts,js}")],
  logging: false,

  migrations: [join(__dirname, "migrations/*.{ts,js}")],
  migrationsTableName: "_postgres_migrations",
});
