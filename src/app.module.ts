import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetUserMiddleware } from './middleware/get-user-middleware';
import { Customer, Proposal, User } from './entities';
import { CustomersModule } from './modules/customers/customers.module';
import { ProposalsModule } from './modules/proposals/proposals.module';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Proposal, Customer],
      migrations: [`${__dirname}/migrations/*{.ts,.js}`],
      migrationsRun: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    CustomersModule,
    ProposalsModule,
    UsersModule,
    AdminModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetUserMiddleware).forRoutes('*');
  }
}
