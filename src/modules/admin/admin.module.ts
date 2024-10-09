import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Proposal, User } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Proposal, User])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
