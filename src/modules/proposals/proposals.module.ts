import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalsController } from './proposals.controller';
import { ProposalsService } from './proposals.service';
import { Proposal, Customer } from '../../entities';
import { CustomersService } from '../customers/customers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proposal]),
    TypeOrmModule.forFeature([Customer]),
  ],
  controllers: [ProposalsController],
  providers: [ProposalsService, CustomersService],
})
export class ProposalsModule {}
