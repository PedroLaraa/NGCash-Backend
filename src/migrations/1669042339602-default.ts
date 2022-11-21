import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669042339602 implements MigrationInterface {
    name = 'default1669042339602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "creditedAccountId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "debitedAccountId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_d98aaccf1177172256d59ab1ff5"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_4e827e9fce3c7c0a2ad017410ef"`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "UQ_d98aaccf1177172256d59ab1ff5" UNIQUE ("creditedAccountIdId")`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "UQ_4e827e9fce3c7c0a2ad017410ef" UNIQUE ("debitedAccountIdId")`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_38ac343b1f34f2d9b63017cb2f6"`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "accountId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "REL_38ac343b1f34f2d9b63017cb2f"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "UQ_38ac343b1f34f2d9b63017cb2f6" UNIQUE ("accountIdId")`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_d98aaccf1177172256d59ab1ff5" FOREIGN KEY ("creditedAccountIdId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_4e827e9fce3c7c0a2ad017410ef" FOREIGN KEY ("debitedAccountIdId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_38ac343b1f34f2d9b63017cb2f6" FOREIGN KEY ("accountIdId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_38ac343b1f34f2d9b63017cb2f6"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_4e827e9fce3c7c0a2ad017410ef"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_d98aaccf1177172256d59ab1ff5"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "UQ_38ac343b1f34f2d9b63017cb2f6"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "REL_38ac343b1f34f2d9b63017cb2f" UNIQUE ("accountId")`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "accountId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_38ac343b1f34f2d9b63017cb2f6" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "UQ_4e827e9fce3c7c0a2ad017410ef"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "UQ_d98aaccf1177172256d59ab1ff5"`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_4e827e9fce3c7c0a2ad017410ef" FOREIGN KEY ("debitedAccountIdId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_d98aaccf1177172256d59ab1ff5" FOREIGN KEY ("creditedAccountIdId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "debitedAccountId"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "creditedAccountId"`);
    }

}
