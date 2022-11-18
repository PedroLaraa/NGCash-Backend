import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668800457812 implements MigrationInterface {
    name = 'default1668800457812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "accountIdId" integer`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "UQ_38ac343b1f34f2d9b63017cb2f6" UNIQUE ("accountIdId")`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_38ac343b1f34f2d9b63017cb2f6"`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "accountId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "REL_38ac343b1f34f2d9b63017cb2f"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_38ac343b1f34f2d9b63017cb2f6" FOREIGN KEY ("accountIdId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_38ac343b1f34f2d9b63017cb2f6"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "REL_38ac343b1f34f2d9b63017cb2f" UNIQUE ("accountId")`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "accountId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_38ac343b1f34f2d9b63017cb2f6" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "UQ_38ac343b1f34f2d9b63017cb2f6"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "accountIdId"`);
    }

}
