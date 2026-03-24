import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAllDatabase1770623049406 implements MigrationInterface {
  name = 'CreateAllDatabase1770623049406';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "full_name" character varying(255) NOT NULL, "avatar" text, "date_of_birth" date, "user_id" uuid, CONSTRAINT "REL_59c55ac40f267d450246040899" UNIQUE ("user_id"), CONSTRAINT "PK_273a06d6cdc2085ee1ce7638b24" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "province" character varying(255) NOT NULL, "ward" character varying(255) NOT NULL, "address_detail" character varying(255) NOT NULL, "user_id" uuid, CONSTRAINT "PK_302d96673413455481d5ff4022a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_phones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone_number" character varying(10) NOT NULL, "user_id" uuid, CONSTRAINT "PK_975f5d595e466bdcbb7b0afc2b1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('active', 'inactive', 'banned')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email_address" character varying(255) NOT NULL, "hash_password" character varying NOT NULL, "status" "public"."users_status_enum" NOT NULL DEFAULT 'active', "last_login_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_d1a16364b1f276e14e8e4cfc47e" UNIQUE ("email_address"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "seller_info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "full_name" character varying NOT NULL, "avatar" character varying NOT NULL, "date_of_birth" date, "seller_id" uuid, CONSTRAINT "REL_ee2827059b61a11dc56a712d7d" UNIQUE ("seller_id"), CONSTRAINT "PK_9b1a4814a7a7fca9fe23f00127e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."seller_phones_type_enum" AS ENUM('company', 'individual')`,
    );
    await queryRunner.query(
      `CREATE TABLE "seller_phones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone_number" character varying(10) NOT NULL, "type" "public"."seller_phones_type_enum" NOT NULL DEFAULT 'individual', "seller_id" uuid, CONSTRAINT "PK_ebdcb4a185d69e7bbea5a5f9608" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "seller_address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "province" character varying(255) NOT NULL, "ward" character varying(255) NOT NULL, "address_detail" character varying(255) NOT NULL, "seller_id" uuid, CONSTRAINT "PK_728d1444eb5f428f2e08d51c1d2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sellers_status_enum" AS ENUM('active', 'inactive', 'banned')`,
    );
    await queryRunner.query(
      `CREATE TABLE "sellers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email_address" character varying NOT NULL, "hash_password" character varying NOT NULL, "status" "public"."sellers_status_enum" NOT NULL DEFAULT 'inactive', "last_login_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_7629d05517b4f0fd38a909695ba" UNIQUE ("email_address"), CONSTRAINT "PK_97337ccbf692c58e6c7682de8a2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "stores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_code" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "seller_id" uuid, CONSTRAINT "UQ_2036aef5ff1670dac3746643f2e" UNIQUE ("store_code"), CONSTRAINT "PK_7aa6e7d71fa7acdd7ca43d7c9cb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "store_info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "avatar" text, "thumbnail" text, "description" text, "phone_number" character varying(15) NOT NULL, "email_address" character varying NOT NULL, "store_id" uuid, CONSTRAINT "UQ_9e4f603371e3fe576e552ae84fb" UNIQUE ("name"), CONSTRAINT "UQ_f5d5ad4b03045a099cff3641f4e" UNIQUE ("slug"), CONSTRAINT "REL_4de73724aade410eb87ca946ac" UNIQUE ("store_id"), CONSTRAINT "PK_7ea57858decfc43b19d7734e0df" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_info" ADD CONSTRAINT "FK_59c55ac40f267d450246040899e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_address" ADD CONSTRAINT "FK_29d6df815a78e4c8291d3cf5e53" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_phones" ADD CONSTRAINT "FK_96bd55026671b792bb3ce699ffd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" ADD CONSTRAINT "FK_ee2827059b61a11dc56a712d7d2" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_phones" ADD CONSTRAINT "FK_fd8e9628ea2ebebe5f1ca0479b3" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_address" ADD CONSTRAINT "FK_977c68add9c856eb9d96db99d19" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ADD CONSTRAINT "FK_540fd9716dec62b65e2d15a8ced" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_info" ADD CONSTRAINT "FK_4de73724aade410eb87ca946ace" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "store_info" DROP CONSTRAINT "FK_4de73724aade410eb87ca946ace"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" DROP CONSTRAINT "FK_540fd9716dec62b65e2d15a8ced"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_address" DROP CONSTRAINT "FK_977c68add9c856eb9d96db99d19"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_phones" DROP CONSTRAINT "FK_fd8e9628ea2ebebe5f1ca0479b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seller_info" DROP CONSTRAINT "FK_ee2827059b61a11dc56a712d7d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_phones" DROP CONSTRAINT "FK_96bd55026671b792bb3ce699ffd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_address" DROP CONSTRAINT "FK_29d6df815a78e4c8291d3cf5e53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_info" DROP CONSTRAINT "FK_59c55ac40f267d450246040899e"`,
    );
    await queryRunner.query(`DROP TABLE "store_info"`);
    await queryRunner.query(`DROP TABLE "stores"`);
    await queryRunner.query(`DROP TABLE "sellers"`);
    await queryRunner.query(`DROP TYPE "public"."sellers_status_enum"`);
    await queryRunner.query(`DROP TABLE "seller_address"`);
    await queryRunner.query(`DROP TABLE "seller_phones"`);
    await queryRunner.query(`DROP TYPE "public"."seller_phones_type_enum"`);
    await queryRunner.query(`DROP TABLE "seller_info"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(`DROP TABLE "user_phones"`);
    await queryRunner.query(`DROP TABLE "user_address"`);
    await queryRunner.query(`DROP TABLE "user_info"`);
  }
}
