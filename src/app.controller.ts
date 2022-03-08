import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Query } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('/getFrenchCompanyNumber')
  async getFrenchCompanyNumber(@Query() query): Promise<string> {
    const WithName = await this.appService.getFrenchCompanyNumber(query?.name);
    return `request ${WithName}`;
  }
}
