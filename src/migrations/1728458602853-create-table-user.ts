import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1728458602853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS "user" (
            "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            "name" varchar NOT NULL,
            "email" varchar NOT NULL
          )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
  }
}
