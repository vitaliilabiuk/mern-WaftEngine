import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as SophPointsMinter from "./abis/SophPointsMinter.json";
import * as SophWearablesMinter from "./abis/SophWeareableMinter.json";
const token = "0x6Fc4E775b4f5F9D621738014de3113D2cdEAE9e7";
// const wearableminter = "0xf3BEC3F87Fd2661fF50F3601F9F4FB930CecC116";

const token1 = "0x55Eb35681f3cdd068c1b8804133387d4e72B26ec";
//const token = "0xdec404576134e5c6271782bc74f4fe17562d4eb9";
const wearableminter = "0x91B78a96b75Fd189886904AF936Ce21A0E26B8D3";

import userspoints from "./points.json";
import asusers from "./use.json";
import userbalances from "./users.json";

@Injectable()
export class AppService {
  private provider(): ethers.JsonRpcProvider {
    const provider = new ethers.JsonRpcProvider("https://polygon-mainnet.infura.io/v3/7258c9d7e648478f9ea5edd3302cd1d8"); // //('https://polygon-mumbai.infura.io/v3/7258c9d7e648478f9ea5edd3302cd1d8');
    return provider;
  }
  

  async addUsers(): Promise<any> {
    const provider = this.provider();
    const leaderBoard = [];
    // get users addresses
    // get users balances and filter by highest
    const signer = new ethers.Wallet("bb419a0ef144ed597d22970dc87384182aa7ade60879f65756ce41f0b64f04ac", provider);
    const pointsContract = new ethers.Contract(token1, SophPointsMinter.abi,signer);
    try {
      const addusers = await pointsContract.addUsers(asusers,userspoints,{gasLimit: 50000000, gasPrice: ethers.parseUnits("10", "gwei")});
     // await addusers.wait();
      console.log(addusers);
      return addusers;
       } catch (error){
        return ("error"+error);
      }
  }

  async getLeaderBoard(): Promise<any> {
    const provider = this.provider();
    const leaderBoard = [];
    // get users addresses
    // get users balances and filter by highest
    const pointsContract = new ethers.Contract(token, SophPointsMinter.abi,provider);

    // const userbalances = await asusersarray.forEach(async user => {
    //   const balance = await pointsContract.getUserBalance(user.address);
    //   return {address: user.address, score: Number(ethers.formatEther(balance))}
    // });
    // const users = await pointsContract.getUserBalance(address);
    //console.log(userbalances);
    //userbalances
   // let sortedInput = [];
    //userbalances.slice().sort((a, b) => b.score - a.score);
    let sortedInput = userbalances.slice().sort((a, b) => b.score - a.score);
    // const tokenBalance = await pointsContract.getUserBalance(address);
    // /console.log(tokenBalance);
    return sortedInput.slice(0, 20);;
  }



  async getBalance(address: string): Promise<number> {
    const provider = this.provider();
    const pointsContract = new ethers.Contract(token, SophPointsMinter.abi,provider);
    const tokenBalance = await pointsContract.getUserBalance(address);
    console.log(tokenBalance);
    return Number(tokenBalance);
  }

  // async mintPoints(address: string, points:number): Promise<number> {
    
  //   const provider = this.provider();
  //   const signer = new ethers.Wallet("bb419a0ef144ed597d22970dc87384182aa7ade60879f65756ce41f0b64f04ac", provider);
  //   const tokenContract = new ethers.Contract(token, MintableBurnable.abi,signer);
  //   try{
  //     const mint = await tokenContract.mint(address, ethers.parseEther(points.toString()));
  //     await mint.wait();
  //     console.log(mint);

  //     const tokenBalance = await tokenContract.balanceOf(address);
  //     console.log(mint);

  //     return Number(ethers.formatEther(tokenBalance));
  //   } catch {
  //     return 0;
  //   }

  // }

  async createUser(address: string): Promise<string> {
    const provider = this.provider();
    const signer = new ethers.Wallet("bb419a0ef144ed597d22970dc87384182aa7ade60879f65756ce41f0b64f04ac", provider);
    const pointsContract = new ethers.Contract(token, SophPointsMinter.abi,signer);
    try {
    const user = await pointsContract.addUser(address);
    await user.wait();
    return user;
     } catch (error){
      return ("error"+error);
    }
  }

  // async mintPoints(address: string, points:number): Promise<any> {
    
  //   const provider = this.provider();
  //   const signer = new ethers.Wallet("bb419a0ef144ed597d22970dc87384182aa7ade60879f65756ce41f0b64f04ac", provider);
  //   const pointsContract = new ethers.Contract(token, SophPointsMinter.abi,signer);
  //   try {
  //     const mint = await pointsContract.increaseBalance(address, ethers.parseEther(points.toString()));
  //     await mint.wait();
  //     console.log(mint);

  //     const tokenBalance = await pointsContract.getUserBalance(address);
  //     console.log(tokenBalance);

  //     return Number(ethers.formatEther(tokenBalance));
  //   } catch(error) {
  //     return console.log("error"+error);
  //   }

  // }

  async mintPoints(address: string, points:number): Promise<number> {
    
    const provider = this.provider();
    const signer = new ethers.Wallet("bb419a0ef144ed597d22970dc87384182aa7ade60879f65756ce41f0b64f04ac", provider);
    const pointsContract = new ethers.Contract(token, SophPointsMinter.abi,signer);
    try {
      console.log("minting points");
      const mint = await pointsContract.increaseBalance(address, points.toString());
      console.log(mint)
      await mint.wait();
      console.log(mint);

      const tokenBalance = await pointsContract.getUserBalance(address);
      console.log(tokenBalance);

      return tokenBalance;
    } catch (error){
      console.log("error"+error)
      return 0;
    }

  }

  async burnPoints(address: string, points:number): Promise<number> {
    
    const provider = this.provider();
    const signer = new ethers.Wallet("bb419a0ef144ed597d22970dc87384182aa7ade60879f65756ce41f0b64f04ac", provider);
    const pointsContract = new ethers.Contract(token, SophPointsMinter.abi,signer);
    try {
      const burn = await pointsContract.decreaseBalance(address, ethers.parseEther(points.toString()));
      await burn.wait();
      console.log(burn);

      const tokenBalance = await pointsContract.getUserBalance(address);
      console.log(tokenBalance);

      return Number(ethers.formatEther(tokenBalance));
    } catch {
      return 0;
    }

  }

  async addWereableMinter(address: string): Promise<any> {
    
    const provider = this.provider();
    const signer = new ethers.Wallet("bb419a0ef144ed597d22970dc87384182aa7ade60879f65756ce41f0b64f04ac", provider);
    const pointsContract = new ethers.Contract(token, SophPointsMinter.abi,signer);
    try {
    const setminter = await pointsContract.setWearableMinter(address);
    await setminter.wait();

    return setminter;
     } catch(error) {
     return console.log("error"+error);
    }

   
  }

  async mintWearable( address: string, itemId:number, useraddress:string): Promise<any> {
    
    console.log("minting werables 2"+address+itemId+useraddress);
    const provider = this.provider();
    const signer = new ethers.Wallet("bb419a0ef144ed597d22970dc87384182aa7ade60879f65756ce41f0b64f04ac", provider);
    const WearablesMinterContract = new ethers.Contract(wearableminter, SophWearablesMinter.abi,signer);
    const pointsContract = new ethers.Contract(token, SophPointsMinter.abi,signer);
    try {

      const tokenBalance = await pointsContract.getUserBalance(useraddress);
      const weareablePrice = await WearablesMinterContract.getItemsPrice(itemId);

      const mint = await WearablesMinterContract.mint(useraddress, itemId);
      await mint.wait();
      console.log(mint);
      return Number(ethers.formatEther(tokenBalance));

      // if( ethers.parseEther(tokenBalance)  < weareablePrice){
      //   console.log(weareablePrice);
      //   return "not enough points";
      // } else {
     
      // }
      
    } catch (error){
      return console.log("error"+error);
    }

  }
  
}
