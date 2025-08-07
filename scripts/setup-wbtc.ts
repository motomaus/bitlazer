import { ethers } from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

const lzrBTC_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "supportedWrappers",
    "outputs": [{"internalType": "contract IERC20", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_WBTC", "type": "address"}],
    "name": "setWBTCAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

async function setupWBTC() {
  const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
  
  const WRAP_CONTRACT = '0x0c978B2F8F3A0E399DaF5C41e4776757253EE5Df';
  const WBTC_ADDRESS = '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f';
  
  const contract = new ethers.Contract(WRAP_CONTRACT, lzrBTC_ABI, provider);
  
  console.log('Checking WBTC configuration...');
  console.log('Contract address:', WRAP_CONTRACT);
  console.log('WBTC address:', WBTC_ADDRESS);
  
  try {
    // Check current owner
    const owner = await contract.owner();
    console.log('Contract owner:', owner);
    
    // Check if WBTC is configured
    const supportedWBTC = await contract.supportedWrappers(WBTC_ADDRESS);
    console.log('Current supportedWrappers[WBTC]:', supportedWBTC);
    
    if (supportedWBTC === '0x0000000000000000000000000000000000000000') {
      console.log('\n❌ WBTC is NOT configured as a supported wrapper!');
      console.log('\nTo fix this, the contract owner needs to run:');
      console.log(`contract.setWBTCAddress("${WBTC_ADDRESS}")`);
      
      // If you have the private key, uncomment below to set it
      /*
      if (process.env.PRIVATE_KEY) {
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const contractWithSigner = contract.connect(wallet);
        
        console.log('\nSetting WBTC address...');
        const tx = await contractWithSigner.setWBTCAddress(WBTC_ADDRESS);
        console.log('Transaction hash:', tx.hash);
        await tx.wait();
        console.log('✅ WBTC address set successfully!');
        
        // Verify it was set
        const newSupportedWBTC = await contract.supportedWrappers(WBTC_ADDRESS);
        console.log('New supportedWrappers[WBTC]:', newSupportedWBTC);
      }
      */
    } else {
      console.log('✅ WBTC is already configured as a supported wrapper');
      console.log('Configured address:', supportedWBTC);
    }
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

setupWBTC();