import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Customer } from '../../entities';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  findAll() {
    try {
      return this.customerRepository.find();
    } catch (err) {
      throw err;
    }
  }

  findProposalById(id: number) {
    try {
      return this.customerRepository.findOne({ where: { id } });
    } catch (err) {
      throw err;
    }
  }

  create(createCustomerDto: { name: string; balance: number }) {
    try {
      const customer = this.customerRepository.create(createCustomerDto);
      return this.customerRepository.save(customer);
    } catch (err) {
      throw err;
    }
  }
}
