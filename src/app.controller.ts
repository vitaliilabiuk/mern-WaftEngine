import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('balance/:address')
  async addressBalance(@Param('address') address: string): Promise<number> {
    return await this.appService.getBalance(address);
  }

  @Post('mint/:address/:points')
  async mintPoints(@Param('address') address: string,@Param('points') points: number): Promise<number> {
    return await this.appService.mintPoints(address, points);
  }

}
