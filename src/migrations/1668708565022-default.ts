import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668708565022 implements MigrationInterface {
    name = 'default1668708565022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Accounts" ("id" SERIAL NOT NULL, "balance" numeric NOT NULL, CONSTRAINT "PK_215996d902f717c5a3a0b54194e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Transactions" ("id" SERIAL NOT NULL, "value" numeric NOT NULL, "creditedAccountIdId" integer, "debitedAccountIdId" integer, CONSTRAINT "REL_d98aaccf1177172256d59ab1ff" UNIQUE ("creditedAccountIdId"), CONSTRAINT "REL_4e827e9fce3c7c0a2ad017410e" UNIQUE ("debitedAccountIdId"), CONSTRAINT "PK_7761bf9766670b894ff2fdb3700" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "accountIdId" integer, CONSTRAINT "UQ_ffc81a3b97dcbf8e320d5106c0d" UNIQUE ("username"), CONSTRAINT "REL_38ac343b1f34f2d9b63017cb2f" UNIQUE ("accountIdId"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_d98aaccf1177172256d59ab1ff5" FOREIGN KEY ("creditedAccountIdId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_4e827e9fce3c7c0a2ad017410ef" FOREIGN KEY ("debitedAccountIdId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_38ac343b1f34f2d9b63017cb2f6" FOREIGN KEY ("accountIdId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_38ac343b1f34f2d9b63017cb2f6"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_4e827e9fce3c7c0a2ad017410ef"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_d98aaccf1177172256d59ab1ff5"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Transactions"`);
        await queryRunner.query(`DROP TABLE "Accounts"`);
    }

}
