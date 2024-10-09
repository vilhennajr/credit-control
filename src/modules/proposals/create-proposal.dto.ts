import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ProposalStatus } from 'src/entities';

export class CreateProposalDto {
  @IsNotEmpty()
  customerId: number;

  @IsNotEmpty()
  createdById: number;

  @IsOptional()
  @IsEnum(ProposalStatus)
  status?: ProposalStatus = ProposalStatus.PENDING;

  @IsNumber()
  amount: number;

  @IsNumber()
  profit: number;

  @IsOptional()
  approvedById?: number;
}
