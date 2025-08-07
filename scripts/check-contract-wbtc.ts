import { ethers } from 'ethers';

async function checkContract() {
  const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
  
  const WRAP_CONTRACT = '0x0c978B2F8F3A0E399DaF5C41e4776757253EE5Df';
  const WBTC_ADDRESS = '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f';
  
  // Try different possible function names
  const possibleABIs = [
    // Try just "WBTC" as a state variable
    {
      abi: [{
        "inputs": [],
        "name": "WBTC",
        "outputs": [{"internalType": "contract IERC20", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
      }],
      functionName: "WBTC"
    },
    // Try getWBTCAddress
    {
      abi: [{
        "inputs": [{"internalType": "address", "name": "_WBTC", "type": "address"}],
        "name": "getWBTCAddress",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
      }],
      functionName: "getWBTCAddress",
      args: [WBTC_ADDRESS]
    }
  ];
  
  console.log('Checking contract for WBTC configuration...');
  console.log('Contract:', WRAP_CONTRACT);
  console.log('WBTC address to check:', WBTC_ADDRESS);
  console.log('');
  
  for (const { abi, functionName, args } of possibleABIs) {
    try {
      const contract = new ethers.Contract(WRAP_CONTRACT, abi, provider);
      const result = args ? await contract[functionName](...args) : await contract[functionName]();
      console.log(`✅ ${functionName}${args ? '(WBTC_ADDRESS)' : '()'} returned:`, result);
      
      if (result && result !== '0x0000000000000000000000000000000000000000') {
        console.log('   -> WBTC appears to be configured!');
      } else {
        console.log('   -> WBTC is NOT configured (returns zero address)');
      }
    } catch (error: any) {
      console.log(`❌ ${functionName}${args ? '(...)' : '()'} failed:`, error.reason || 'Function does not exist or reverted');
    }
  }
  
  // Also check owner and paused state
  const metadataABI = [
    {
      "inputs": [],
      "name": "owner",
      "outputs": [{"internalType": "address", "name": "", "type": "address"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "__apply8To18DecimalsConversion",
      "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  
  const metadataContract = new ethers.Contract(WRAP_CONTRACT, metadataABI, provider);
  
  console.log('\n=== Contract Metadata ===');
  try {
    const owner = await metadataContract.owner();
    console.log('Owner:', owner);
  } catch (e) {
    console.log('Owner: Unable to read');
  }
  
  try {
    const paused = await metadataContract.paused();
    console.log('Paused:', paused);
  } catch (e) {
    console.log('Paused: Unable to read');
  }
  
  try {
    const decimalsConversion = await metadataContract.__apply8To18DecimalsConversion();
    console.log('Decimals conversion:', decimalsConversion);
  } catch (e) {
    console.log('Decimals conversion: Unable to read');
  }
}

checkContract();