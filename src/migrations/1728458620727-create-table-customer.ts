import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCustomer1728458620727 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS "customer" (
            "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            "name" varchar NOT NULL,
            "balance" float NOT NULL DEFAULT 0
          )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "customer"`);
  }
}
