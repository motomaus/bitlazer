import { ethers } from 'ethers';

// Try with the exact ABI structure from the contract
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
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "amount", "type": "uint256"},
      {"internalType": "address", "name": "_WBTC", "type": "address"}
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

async function checkWBTCSupport() {
  const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
  
  const WRAP_CONTRACT = '0x0c978B2F8F3A0E399DaF5C41e4776757253EE5Df';
  const WBTC_ADDRESS = '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f';
  
  const contract = new ethers.Contract(WRAP_CONTRACT, lzrBTC_ABI, provider);
  
  console.log('Checking lzrBTC contract configuration...');
  console.log('Contract address:', WRAP_CONTRACT);
  console.log('WBTC address:', WBTC_ADDRESS);
  
  try {
    // First check the owner
    const owner = await contract.owner();
    console.log('Contract owner:', owner);
    
    // Try to check if WBTC is supported
    try {
      const supportedWBTC = await contract.supportedWrappers(WBTC_ADDRESS);
      console.log('Supported WBTC address from contract:', supportedWBTC);
      
      if (supportedWBTC === '0x0000000000000000000000000000000000000000') {
        console.log('❌ WBTC is NOT configured as a supported wrapper!');
        console.log('The owner needs to call setWBTCAddress() with:', WBTC_ADDRESS);
      } else {
        console.log('✅ WBTC is properly configured as a supported wrapper');
        console.log('Configured WBTC address:', supportedWBTC);
      }
    } catch (mapError) {
      console.log('Error reading supportedWrappers mapping. The function might not exist or have different signature.');
      console.log('This could mean the contract has a different structure than expected.');
    }
    
    // Try to estimate gas for a mint transaction to see if it would work
    console.log('\nTrying to estimate gas for a mint transaction...');
    const testAmount = ethers.utils.parseUnits('0.0001', 8); // WBTC has 8 decimals
    try {
      const gasEstimate = await contract.estimateGas.mint(testAmount, WBTC_ADDRESS, {
        from: '0x0000000000000000000000000000000000000001' // dummy address for estimation
      });
      console.log('Gas estimate for mint:', gasEstimate.toString());
    } catch (gasError: any) {
      console.log('Cannot estimate gas for mint. Error:', gasError.reason || gasError.message);
      if (gasError.reason && gasError.reason.includes('Wrapper not supported')) {
        console.log('❌ Confirmed: WBTC is not configured as a supported wrapper!');
      }
    }
    
  } catch (error: any) {
    console.error('Error checking contract:', error.message);
  }
}

checkWBTCSupport();