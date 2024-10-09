import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProposalStatus {
  PENDING = 'PENDING',
  REFUSED = 'REFUSED',
  ERROR = 'ERROR',
  SUCCESSFUL = 'SUCCESSFUL',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Proposal, (proposal) => proposal.createdBy)
  proposals: Proposal[];
}

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float', default: 0 })
  balance: number;

  @OneToMany(() => Proposal, (proposal) => proposal.customer)
  proposals: Proposal[];
}

@Entity()
export class Proposal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.proposals)
  customer: Customer;

  @ManyToOne(() => User, (user) => user.proposals)
  createdBy: User;

  @Column('text')
  status: 'PENDING' | 'REFUSED' | 'ERROR' | 'SUCCESSFUL';
  default: 'PENDING';

  @Column('decimal')
  amount: number;

  @Column('decimal')
  profit: number;

  @ManyToOne(() => User, { nullable: true })
  approvedBy: User;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
