import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as SophPointsMinter from "./abis/SophPointsMinter.json";
import * as SophWearablesMinter from "./abis/SophWeareableMinter.json";
import * as wearablesMinter from "./abis/wearables.json";
import items from "./allitems.json";
import allsoph from "./allsophs.json";
import userspoints from "./points.json";
import asusers from "./use.json";
const token = "0x6Fc4E775b4f5F9D621738014de3113D2cdEAE9e7";
// const wearableminter = "0xf3BEC3F87Fd2661fF50F3601F9F4FB930CecC116";

const token1 = "0x55Eb35681f3cdd068c1b8804133387d4e72B26ec";
//const token = "0xdec404576134e5c6271782bc74f4fe17562d4eb9";
const wearableminter = "0x1289636B701AfcA6D095164D9ce0f44bba0b95FC";

@Injectable()
export class AppService {
  private provider(): ethers.JsonRpcProvider {
    const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/polygon"); //("https://polygon-mainnet.infura.io/v3/7258c9d7e648478f9ea5edd3302cd1d8"); // //('https://polygon-mumbai.infura.io/v3/7258c9d7e648478f9ea5edd3302cd1d8');
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
    const leaderBoard = [];
    // get users addresses
    // get users balances and filter by highest
    console.log(asusers);
    const balances = await this.getBalances(asusers);
    // const users = await pointsContract.getUserBalance(address);
    console.log(balances);
    //userbalances
   // let sortedInput = [];
    //userbalances.slice().sort((a, b) => b.score - a.score);
    let sortedInput = balances.slice().sort((a, b) => b.score - a.score);
    // const tokenBalance = await pointsContract.getUserBalance(address);
    // /console.log(tokenBalance);
    return sortedInput.slice(0, 20);
  }

  async getItemPrice(address:string,itemid: number): Promise<number> {
    console.log("weareablePrice");
    const provider = this.provider();
    const WearablesMinterContract = new ethers.Contract(wearableminter, SophWearablesMinter.abi,provider);
    const weareablePrice = await WearablesMinterContract.getItemsPrice(itemid);
    console.log(weareablePrice);
    return Number(weareablePrice);
  }

  async getBalance(address: string): Promise<any> {
    const provider = this.provider();
    const pointsContract = new ethers.Contract(token, SophPointsMinter.abi,provider);
    try {
      const tokenBalance = await pointsContract.getUserBalance(address);
      console.log(tokenBalance);
      return Number(tokenBalance);
    } catch (error){
      console.log("error"+error);
      return error;
    }

  }

  async getBalances(addresses: string[]): Promise<any> {
    const leaderBoard = [];
    const provider = this.provider();
    const pointsContract = new ethers.Contract(token, SophPointsMinter.abi,provider);
    try {
      const users = await Promise.all(asusers.map(async user => {
        const tokenBalance = await pointsContract.getUserBalance(user);
        console.log(user);
        console.log(tokenBalance);
        leaderBoard.push({address: user, score: Number(tokenBalance)})
      }));
      console.log(users);
      console.log(leaderBoard);
      return leaderBoard;
    } catch (error){
      console.log("error"+error);
      return error;
    }

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

  async createUser(address: string): Promise<any> {
    const provider = this.provider();
    const signer = new ethers.Wallet("bb419a0ef144ed597d22970dc87384182aa7ade60879f65756ce41f0b64f04ac", provider);
    const pointsContract = new ethers.Contract(token, SophPointsMinter.abi,signer);
    try {
    const user = await pointsContract.addUser(address);
   // await user.wait();
    return "submited";
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

  async mintPoints(address: string, points:number): Promise<any> {
    
    const provider = this.provider();
    const signer = new ethers.Wallet("bb419a0ef144ed597d22970dc87384182aa7ade60879f65756ce41f0b64f04ac", provider);
    const pointsContract = new ethers.Contract(token, SophPointsMinter.abi,signer);
    try {
      console.log("minting points");
      const mint = await pointsContract.increaseBalance(address, points.toString());
      console.log(mint)
      // await mint.wait();
      // console.log(mint);

      const tokenBalance = await pointsContract.getUserBalance(address);
      console.log(tokenBalance);

      return "submited";
    } catch (error){
      console.log("error :"+error)
      return error;
    }

  }

  async burnPoints(address: string, points:number): Promise<any> {
    
    const provider = this.provider();
    const signer = new ethers.Wallet("bb419a0ef144ed597d22970dc87384182aa7ade60879f65756ce41f0b64f04ac", provider);
    const pointsContract = new ethers.Contract(token, SophPointsMinter.abi,signer);
    try {
      const burn = await pointsContract.decreaseBalance(address, ethers.parseEther(points.toString()));
      // await burn.wait();
      // console.log(burn);

      const tokenBalance = await pointsContract.getUserBalance(address);
      console.log(tokenBalance);

      return "submited";
    } catch (error){
      return error;
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

      if(tokenBalance < weareablePrice){
        console.log(weareablePrice);
        return "not enough points";
      } else {
        const mint = await WearablesMinterContract.mint(useraddress, itemId);
        // await mint.wait();
        console.log(mint);
        return "submited";
      }
      
    } catch (error){
      return console.log("error"+error);
    }

  }

  async directMintWearables(): Promise<any> { // address: string[], items:number[]
    
    const provider = this.provider();
    const signer = new ethers.Wallet("bb419a0ef144ed597d22970dc87384182aa7ade60879f65756ce41f0b64f04ac", provider);
    const WearablesMinterContract = new ethers.Contract("0xd044684bb8470b3eea0b11b5506cc42d765ba533", wearablesMinter.abi,signer);
    //const pointsContract = new ethers.Contract(token, SophPointsMinter.abi,signer);
    try {

     // const tokenBalance = await pointsContract.getUserBalance(useraddress);
     // const weareablePrice = await WearablesMinterContract.getItemsPrice(itemId);

     const mint = await WearablesMinterContract.issueTokens(allsoph, items);
     //const mint = await WearablesMinterContract.issueTokens(["0xe5cf1BB88a59F9fC609689C681D1d14bfE7Ce73A"],[0]);
     // await mint.wait();
     console.log(mint);
     return "submited";
      
    } catch (error){
      return console.log("error"+error);
    }

  }
  
}
