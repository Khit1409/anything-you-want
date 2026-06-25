import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1782306500701 implements MigrationInterface {
    name = 'Update1782306500701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "store_banking_payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "account_number" character varying(255), "account_name" character varying(255), "bank_name" character varying(255), "enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "store_id" uuid, CONSTRAINT "CK_STORE_BANKING_REQUIRED" CHECK ( enabled = false
    OR
    (
        bank_name IS NOT NULL 
        AND account_number IS NOT NULL
        AND account_name IS NOT NULL
    )
  ), CONSTRAINT "PK_bc55332368365d6530bfc93c7dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store_momo_payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone_number" character varying, "owner_name" character varying, "enabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "store_id" uuid, CONSTRAINT "UQ_4ad0970c9e6219aeaaeb14832f7" UNIQUE ("phone_number"), CONSTRAINT "REL_0284561a964f1b698d743543fa" UNIQUE ("store_id"), CONSTRAINT "CK_STORE_MOMO_BANKING_REQUIRED" CHECK ( enabled = false 
    OR
    (
    phone_number IS NOT NULL AND
    owner_name IS NOT NULL
    )
    ), CONSTRAINT "PK_ead04d108de11aab9092f0e6bc4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."order_payment_type_enum" RENAME TO "order_payment_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."order_payment_type_enum" AS ENUM('banking', 'momo', 'delivered')`);
        await queryRunner.query(`ALTER TABLE "order_payment" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order_payment" ALTER COLUMN "type" TYPE "public"."order_payment_type_enum" USING "type"::"text"::"public"."order_payment_type_enum"`);
        await queryRunner.query(`ALTER TABLE "order_payment" ALTER COLUMN "type" SET DEFAULT 'delivered'`);
        await queryRunner.query(`DROP TYPE "public"."order_payment_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "store_banking_payments" ADD CONSTRAINT "FK_232cbe834262e87129af03094b0" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_momo_payments" ADD CONSTRAINT "FK_0284561a964f1b698d743543fa3" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_momo_payments" DROP CONSTRAINT "FK_0284561a964f1b698d743543fa3"`);
        await queryRunner.query(`ALTER TABLE "store_banking_payments" DROP CONSTRAINT "FK_232cbe834262e87129af03094b0"`);
        await queryRunner.query(`CREATE TYPE "public"."order_payment_type_enum_old" AS ENUM('banking', 'momo', 'qrCode', 'delivered')`);
        await queryRunner.query(`ALTER TABLE "order_payment" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order_payment" ALTER COLUMN "type" TYPE "public"."order_payment_type_enum_old" USING "type"::"text"::"public"."order_payment_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "order_payment" ALTER COLUMN "type" SET DEFAULT 'delivered'`);
        await queryRunner.query(`DROP TYPE "public"."order_payment_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."order_payment_type_enum_old" RENAME TO "order_payment_type_enum"`);
        await queryRunner.query(`DROP TABLE "store_momo_payments"`);
        await queryRunner.query(`DROP TABLE "store_banking_payments"`);
    }

}
