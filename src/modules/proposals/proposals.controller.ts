import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { Proposal } from 'src/entities';
import { CreateProposalDto } from './create-proposal.dto';
//@ts-ignore
import { Request } from 'express';

@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Get()
  findAllPending(@Req() req: Request) {
    const userId = req.user.id;
    return this.proposalsService
      .findPendingProposalsByUser(userId)
      .then((proposals) => {
        return proposals.map((proposal) => {
          return {
            id: proposal.id,
            customer: proposal.customer ? proposal.customer.id : null,
            status: proposal.status,
            amount: proposal.amount,
            profit: proposal.profit,
            createdBy: proposal.createdBy ? proposal.createdBy.id : null,
          };
        });
      });
  }

  @Get('refused')
  findRefused(@Req() req: Request) {
    const userId = req.user.id;
    return this.proposalsService.findRefusedProposals(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user.id;
    //@ts-ignore

    return this.proposalsService.findOne(+id, userId);
  }

  @Post()
  create(
    @Body() createProposalDto: CreateProposalDto,
    @Req() req: Request,
  ): Promise<Proposal> {
    const userId = req.user.id;
    createProposalDto.createdById = userId;
    return this.proposalsService.create(createProposalDto);
  }

  @Post(':proposal_id/approve')
  approve(@Param('proposal_id') proposalId: string, @Req() req: Request) {
    const userId = req.user.id;
    //@ts-ignore

    return this.proposalsService.approveProposal(+proposalId, userId);
  }

  @Post(':proposal_id/refused')
  refused(@Param('proposal_id') proposalId: string, @Req() req: Request) {
    const userId = req.user.id;
    //@ts-ignore

    return this.proposalsService.refusedProposal(+proposalId, userId);
  }
}
