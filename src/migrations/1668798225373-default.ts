import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668798225373 implements MigrationInterface {
    name = 'default1668798225373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "created_at"`);
    }

}
