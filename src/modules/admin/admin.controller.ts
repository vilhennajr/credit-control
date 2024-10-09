import { Controller, Get, Query } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('profit-by-status')
  async getProfitByStatus() {
    return this.adminService.getProfitByStatus();
  }

  @Get('best-users')
  async getBestUsers(@Query('start') start: string, @Query('end') end: string) {
    return this.adminService.getBestUsers(start, end);
  }
}
