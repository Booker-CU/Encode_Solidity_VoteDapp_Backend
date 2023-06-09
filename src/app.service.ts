import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign } from 'crypto';
import { ethers, Contract, Signer} from 'ethers';

import * as tokenJson from "./assets/MyERC20Token.json"

@Injectable()
export class AppService {

  provider: ethers.providers.BaseProvider;
  contract: Contract;

  constructor( private configService: ConfigService) {

    const apiKey = this.configService.get<string>("ALCHEMY_API_KEY")

    const tokenAddress = this.configService.get<string>("TOKEN_ADDRESS")
    this.provider = new ethers.providers.AlchemyProvider("maticmum", apiKey)


    this.contract = new Contract(
      tokenAddress,
      tokenJson.abi,
      this.provider)
  }


  getHello(): string {
    return 'Hello Booker 7!';
  }

  getLastBlock(): Promise<ethers.providers.Block> {
    return this.provider.getBlock("latest");
  }

  // For MyERC20Votes Contract Address
  getAddress() {
    return "TOKEN_ADDRESS";
  }


  // For getting token address without exposing
  async getTokenAddress() {
    const tokenAddress = await this.contract.address
    return tokenAddress;
  }


  getTotalSupply() {
      return this.contract.totalSupply();
  }


  getBalanceOf(address: string) {
      return this.contract.balanceOf(address);
  }

  

   async getTransactionReceipt(hash: string) {
    const tx = await this.provider.getTransaction(hash);
    const receipt = await tx.wait();
    return receipt ;
  }


  /*async getReceipt(tx: ethers.providers.TransactionResponse) {
    return await tx.wait();
  }
  */

  async getMinterRole() {

    return this.contract.MINTER_ROLE()
  }

  async requestTokens(address: string, signature: string) {
    //ethers.utils.verifyMessage("abcd", signature) != address;
    const pKey = this.configService.get<string>("PRIVATE_KEY")
    const wallet = new ethers.Wallet(pKey);
    const signer = wallet.connect(this.provider)
    return this.contract.connect(signer).mint(address, ethers.utils.parseUnits("10"))
  }

  // async delegate() {
  //   const pKey = this.configService.get<string>("PRIVATE_KEY")
  //   const wallet = new ethers.Wallet(pKey);
  //   const signer = wallet.connect(this.provider)
  //   this.contract.connect(signer)
  // }


}
