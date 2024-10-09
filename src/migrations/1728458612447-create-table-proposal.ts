import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProposal1728458612447 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS "proposal" (
            "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            "customerId" integer,
            "createdById" integer,
            "status" text CHECK( status IN ('PENDING', 'REFUSED', 'ERROR', 'SUCCESSFUL') ) NOT NULL DEFAULT 'PENDING',
            "amount" decimal NOT NULL,
            "profit" decimal NOT NULL,
            "approvedById" integer,
            "isActive" boolean NOT NULL DEFAULT 1,
            "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
            "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
            FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
            FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
            FOREIGN KEY ("approvedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
          )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "proposal"`);
  }
}
