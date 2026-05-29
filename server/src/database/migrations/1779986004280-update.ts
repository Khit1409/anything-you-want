import { MigrationInterface, QueryRunner } from 'typeorm';

export class Update1779986004280 implements MigrationInterface {
  name = 'Update1779986004280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reset_seller_accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email_address" character varying(255) NOT NULL, "reset_token" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_f11e13961960c1d27bd01a32ff1" UNIQUE ("email_address"), CONSTRAINT "PK_d42569db7d7395bd3691779251b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reset_user_accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email_address" character varying(255) NOT NULL, "reset_token" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_1dd64d8a796ec88cc3945cee8d1" UNIQUE ("email_address"), CONSTRAINT "PK_b28a4f417a9fbb0d2fe7c5543be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" DROP CONSTRAINT "FK_540fd9716dec62b65e2d15a8ced"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ADD CONSTRAINT "UQ_540fd9716dec62b65e2d15a8ced" UNIQUE ("seller_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ADD CONSTRAINT "FK_540fd9716dec62b65e2d15a8ced" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reset_seller_accounts" ADD CONSTRAINT "FK_f11e13961960c1d27bd01a32ff1" FOREIGN KEY ("email_address") REFERENCES "sellers"("email_address") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reset_user_accounts" ADD CONSTRAINT "FK_1dd64d8a796ec88cc3945cee8d1" FOREIGN KEY ("email_address") REFERENCES "users"("email_address") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reset_user_accounts" DROP CONSTRAINT "FK_1dd64d8a796ec88cc3945cee8d1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reset_seller_accounts" DROP CONSTRAINT "FK_f11e13961960c1d27bd01a32ff1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" DROP CONSTRAINT "FK_540fd9716dec62b65e2d15a8ced"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" DROP CONSTRAINT "UQ_540fd9716dec62b65e2d15a8ced"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stores" ADD CONSTRAINT "FK_540fd9716dec62b65e2d15a8ced" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`DROP TABLE "reset_user_accounts"`);
    await queryRunner.query(`DROP TABLE "reset_seller_accounts"`);
  }
}
