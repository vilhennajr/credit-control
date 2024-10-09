import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findProposalById(+id);
  }

  @Post()
  create(@Body() createCustomerDto: { name: string; balance: number }) {
    return this.customersService.create(createCustomerDto);
  }
}
