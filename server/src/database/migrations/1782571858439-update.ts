import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1782571858439 implements MigrationInterface {
    name = 'Update1782571858439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_banking_payments" DROP CONSTRAINT "FK_232cbe834262e87129af03094b0"`);
        await queryRunner.query(`ALTER TABLE "store_banking_payments" ADD CONSTRAINT "UQ_232cbe834262e87129af03094b0" UNIQUE ("store_id")`);
        await queryRunner.query(`ALTER TABLE "store_banking_payments" ADD CONSTRAINT "FK_232cbe834262e87129af03094b0" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_banking_payments" DROP CONSTRAINT "FK_232cbe834262e87129af03094b0"`);
        await queryRunner.query(`ALTER TABLE "store_banking_payments" DROP CONSTRAINT "UQ_232cbe834262e87129af03094b0"`);
        await queryRunner.query(`ALTER TABLE "store_banking_payments" ADD CONSTRAINT "FK_232cbe834262e87129af03094b0" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
