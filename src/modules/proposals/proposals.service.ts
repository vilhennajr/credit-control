import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposal, ProposalStatus } from '../../entities';
import { CreateProposalDto } from './create-proposal.dto';

@Injectable()
export class ProposalsService {
  constructor(
    @InjectRepository(Proposal)
    private readonly proposalRepository: Repository<Proposal>,
  ) {}

  findPendingProposalsByUser(userId: number) {
    try {
      return this.proposalRepository.find({
        where: { status: ProposalStatus.PENDING, createdBy: { id: userId } },
        relations: ['customer', 'createdBy'],
      });
    } catch (err) {
      throw err;
    }
  }

  findRefusedProposals(userId: number) {
    try {
      return this.proposalRepository.find({
        where: { status: ProposalStatus.REFUSED, createdBy: { id: userId } },
        relations: ['customer', 'createdBy'],
      });
    } catch (err) {
      throw err;
    }
  }

  findOne(id: number, userId: number) {
    try {
      return this.proposalRepository.findOne({
        where: { id, createdBy: { id: userId } },
      });
    } catch (err) {
      throw err;
    }
  }

  async approveProposal(proposalId: number, userId: number) {
    try {
      const proposal = await this.proposalRepository.findOne({
        where: { id: proposalId, createdBy: { id: userId } },
      });

      if (!proposal) {
        throw new Error('Proposta não encontrada ou não pertence ao usuário.');
      }

      if (proposal.status === ProposalStatus.PENDING) {
        proposal.status = ProposalStatus.SUCCESSFUL;
        proposal.updatedAt = new Date();
        return this.proposalRepository.save(proposal);
      }

      throw new Error('Proposta não está pendente.');
    } catch (err) {
      throw err;
    }
  }

  async refusedProposal(proposalId: number, userId: number) {
    try {
      const proposal = await this.proposalRepository.findOne({
        where: { id: proposalId, createdBy: { id: userId } },
      });
      if (!proposal) {
        throw new Error('Proposta não encontrada.');
      }

      if (proposal.status === ProposalStatus.PENDING) {
        proposal.status = ProposalStatus.REFUSED;
        proposal.updatedAt = new Date();
        return this.proposalRepository.save(proposal);
      }

      throw new Error('Proposta não está pendente.');
    } catch (err) {
      throw err;
    }
  }

  async create(createProposalDto: CreateProposalDto): Promise<Proposal> {
    try {
      const proposal = this.proposalRepository.create({
        ...createProposalDto,
        status: createProposalDto.status || ProposalStatus.PENDING,
        createdBy: { id: createProposalDto.createdById },
      });
      return this.proposalRepository.save(proposal);
    } catch (err) {
      throw err;
    }
  }
}
