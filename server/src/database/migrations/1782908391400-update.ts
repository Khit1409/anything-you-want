import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1782908391400 implements MigrationInterface {
    name = 'Update1782908391400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_payment" ALTER COLUMN "payment_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_payment" ALTER COLUMN "payment_id" SET NOT NULL`);
    }

}
