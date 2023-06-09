import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestTokensDto } from './dto/requestTokens.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("last-block")
  getLastBlock() {
    return this.appService.getLastBlock();
  }

  @Get('address')
  getAddress() {
    return this.appService.getAddress();

  }

  //@Get("Token-Address")
  //getTokenAddress() {
  //  return this.appService.getTokenAddress();
  //}

  @Get("contract-address")
  getContractAddress() {
    return this.appService.getTokenAddress();
  }

  @Get('total-supply')
  getTotalSupply() {
    return this.appService.getTotalSupply();
  }

  @Get("balance/:address")
  getBalanceOf(@Param("address") address: string) {
    return this.appService.getBalanceOf(address);
  }

  @Get("transaction-receipt/")
  async getTransactionReceipt(@Query("hash") hash: string) {
    return await this.appService.getTransactionReceipt(hash);
  }

  @Get("Minter-Role-Check")
     getMinterRole() {
      return this.appService.getMinterRole()
    }

  @Post("request-tokens")
  requestTokens(@Body() body: RequestTokensDto) {
    return this.appService.requestTokens(body.address, body.signature);
  }
}
