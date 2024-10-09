import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proposal, ProposalStatus, User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Proposal)
    private readonly proposalRepository: Repository<Proposal>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getProfitByStatus() {
    try {
      const proposals = await this.proposalRepository.find({
        relations: ['createdBy'],
      });
      const profitByStatus = {};

      for (const proposal of proposals) {
        const { status, profit, createdBy } = proposal;
        const userName = createdBy ? createdBy.name : 'Unknown User';

        if (!profitByStatus[status]) {
          profitByStatus[status] = {};
        }

        if (!profitByStatus[status][userName]) {
          profitByStatus[status][userName] = 0;
        }

        profitByStatus[status][userName] += profit;
      }

      return profitByStatus;
    } catch (err) {
      throw err;
    }
  }

  async getBestUsers(start: string, end: string) {
    try {
      const proposals = await this.proposalRepository
        .createQueryBuilder('proposal')
        .select(
          'proposal.createdBy.id AS createdBy, SUM(proposal.profit) AS totalProfit',
        )
        .where('proposal.status = :status', {
          status: ProposalStatus.SUCCESSFUL,
        })
        .andWhere('proposal.updatedAt BETWEEN :start AND :end', { start, end })
        .groupBy('proposal.createdBy.id')
        .orderBy('totalProfit', 'DESC')
        .getRawMany();

      const bestUsers = await Promise.all(
        proposals.map(async (proposal) => {
          const user = await this.userRepository.findOne({
            where: { id: proposal.createdBy },
          });
          return {
            id: user ? user.id : null,
            fullName: user ? user.name : 'Unknown User',
            totalProposal: proposal.totalProfit,
          };
        }),
      );

      return bestUsers;
    } catch (err) {
      throw err;
    }
  }
}
