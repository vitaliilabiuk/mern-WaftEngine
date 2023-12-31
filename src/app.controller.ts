import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('balance/:address')
  async addressBalance(@Param('address') address: string): Promise<number> {
    return await this.appService.getBalance(address);
  }

  @Get('leaderboard/')
  async leaderBoard(): Promise<JSON> {
    return await this.appService.getLeaderBoard();
  }

  @Get('itemprice/:address/:itemid')
  async itemPrice(@Param('address') address: string,@Param('itemid') itemid: number): Promise<number> {
    return await this.appService.getItemPrice(address,itemid);
  }

  // @Post('addusers/')
  // async addusers(): Promise<any> {
  //   return await this.appService.addUsers();
  // }

  @Post('createuser/:address')
  async mintUser(@Param('address') address: string): Promise<string> {
    return await this.appService.createUser(address);
  }

  // @Post('mintbatch/')
  // async mintbatchIntems(): Promise<string> {
  //   return await this.appService.directMintWearables();
  // }

  // @Post('createusers/:address')
  // async mintUser(@Param('address') address[]: string[]): Promise<string> {
  //   return await this.appService.createUser(address);
  // }

  @Post('mintpoints/:address/:points')
  async mintPoints(@Param('address') address: string,@Param('points') points: number): Promise<number> {
    return await this.appService.mintPoints(address, points);
  }

  @Post('burnpoints/:address/:points')
  async burnPoints(@Param('address') address: string,@Param('points') points: number): Promise<number> {
    return await this.appService.burnPoints(address, points);
  }

  @Post('minter/:address')
  async addMinter(@Param('address') address: string): Promise<number> {
    return await this.appService.addWereableMinter(address);
  }

  @Post('purchase/:address/:itemId/:user_address')
  async mintWerables(@Param('address') address: string,@Param('itemId') points: number, @Param('user_address') useraddress: string): Promise<number> {
    console.log("minting werables 1");
    return await this.appService.mintWearable(address,points,useraddress);
  }

}
