import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1782219568728 implements MigrationInterface {
    name = 'Update1782219568728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "UQ_a97c808a83af1497276bf85e5ba" UNIQUE ("orderCode")`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "orders_orderCode_seq" OWNED BY "orders"."orderCode"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "orderCode" SET DEFAULT nextval('"orders_orderCode_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "orderCode" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "orders_orderCode_seq"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "UQ_a97c808a83af1497276bf85e5ba"`);
    }

}
