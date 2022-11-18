import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668791167612 implements MigrationInterface {
    name = 'default1668791167612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "accountId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Accounts" ALTER COLUMN "balance" SET DEFAULT '100'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Accounts" ALTER COLUMN "balance" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "accountId"`);
    }

}
