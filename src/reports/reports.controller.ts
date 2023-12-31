import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guards';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/dtos/current-user.decorator';
import { User } from 'src/users/user.entity';
import { CreateReportDto } from './dtos/create-report.dto.';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';
@Controller('reports')
export class ReportsController {

constructor(private reportsService:ReportsService){}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body:CreateReportDto,@CurrentUser() user:User){
 
        return this.reportsService.create(body,user);
        
    }
}
