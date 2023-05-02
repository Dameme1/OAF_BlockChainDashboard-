import { BlockchainReader } from "./blockchain_reader";
import { ethers } from "ethers";
import { abi } from "./ERC20.json";



export class EventListener {
  private blockchainReader: BlockchainReader;

  constructor() {
    this.blockchainReader = new BlockchainReader(String("wss://eth-mainnet.g.alchemy.com/v2/k1vw_WTALaxFGFCTc5r4WsTdRUSpIdJc"));
  }

  
  async listenToEvents(): Promise<void> {
    
    this.blockchainReader.listenToBlockHeaders(async (blockNumber: number) => {
      const starGateAd = "0x8731d54E9D02c286767d56ac03e8037C07e01e98";
      const usdcAd = ["0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"];
      const eventSignature = "Transfer(address,address,uint256)"
      const eventHexStr = ethers.keccak256(ethers.toUtf8Bytes(eventSignature)); // same as utils.id
      const stargateHexStr = ethers.AbiCoder.defaultAbiCoder().encode(
      ["address"],
      ["0xdf0770df86a8034b3efef0a1bb3c889b8332ff56"]
      );

  const topics = [eventHexStr, stargateHexStr]; //hardcoded the starget router address
      const events = await this.blockchainReader.getEvents(blockNumber - 100, blockNumber, topics, usdcAd);
      const abiObject = new ethers.Interface(abi)
      const now = new Date();
      for(let i = 0; i < events.length; i++){
        const log = events[i]; 
        const decodedLog = abiObject.parseLog({ topics: log.topics as string[], data: log.data })
        console.log(decodedLog); 
      }
      const estString = now.toLocaleString("en-US", { timeZone: "America/New_York" });
      console.log(`Block Number: ${blockNumber} | ${estString}`);
    });
  }
}
