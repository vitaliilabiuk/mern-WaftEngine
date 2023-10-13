import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as MintableBurnable from "./abis/MintableBurnableERC20.json";

const token = "0xDec404576134E5c6271782bC74F4Fe17562d4eB9";

@Injectable()
export class AppService {
  private provider(): ethers.JsonRpcProvider {
    const provider = new ethers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/');
    return provider;
  }

  async getBalance(address: string): Promise<number> {
    const provider = this.provider();
    const tokenContract = new ethers.Contract(token, MintableBurnable.abi,provider);
    const tokenBalance = await tokenContract.balanceOf(address);
    return Number(ethers.formatEther(tokenBalance));
  }

  async mintPoints(address: string, points:number): Promise<number> {
    
    const provider = this.provider();
    const signer = new ethers.Wallet("bb419a0ef144ed597d22970dc87384182aa7ade60879f65756ce41f0b64f04ac", provider);
    const tokenContract = new ethers.Contract(token, MintableBurnable.abi,signer);
    try{
      const mint = await tokenContract.mint(address, ethers.parseEther(points.toString()));
      await mint.wait();
      console.log(mint);

      const tokenBalance = await tokenContract.balanceOf(address);
      console.log(mint);

      return Number(ethers.formatEther(tokenBalance));
    } catch {
      return 0;
    }

  }
  
}
