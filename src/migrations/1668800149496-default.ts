import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668800149496 implements MigrationInterface {
    name = 'default1668800149496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "accountId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "accountId"`);
    }

}
