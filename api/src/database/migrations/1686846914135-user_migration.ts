import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMigration1686846914135 implements MigrationInterface {
    name = 'UserMigration1686846914135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_provider_enum" AS ENUM('google', 'facebook', 'apple')`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" SERIAL NOT NULL, "provider" "public"."users_provider_enum", "first_name" character varying(256) NOT NULL, "last_name" character varying(256) NOT NULL, "email" character varying(256) NOT NULL, "contact" character varying(16) NOT NULL, "password" character varying(60) NOT NULL, "last_login" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_6c71f479b6fd0e0f7e1b8d855e0" UNIQUE ("contact"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_provider_enum"`);
    }

}
