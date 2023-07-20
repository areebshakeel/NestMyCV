import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserController } from 'src/users/users.controller';
import { ReportsController } from 'src/reports/reports.controller';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
