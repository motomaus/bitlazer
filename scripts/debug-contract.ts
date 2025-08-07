import { ethers } from 'ethers';

async function debugContract() {
  const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
  
  const WRAP_CONTRACT = '0x0c978B2F8F3A0E399DaF5C41e4776757253EE5Df';
  const WBTC_ADDRESS = '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f';
  const TEST_USER = '0x66D5421F0bc20A55b068118bCe225Fc968CcF84F';
  const TEST_AMOUNT = '137560000000000'; // 0.00013756 WBTC in 18 decimals
  
  console.log('=== CONTRACT DEBUGGING ===\n');
  
  // 1. Get the contract bytecode to see if it's verified
  const code = await provider.getCode(WRAP_CONTRACT);
  console.log('1. Contract has bytecode:', code.length > 2 ? 'YES' : 'NO');
  console.log('   Bytecode length:', code.length);
  
  // 2. Try to decode the mint function selector
  console.log('\n2. Testing mint function calls:');
  
  // Test different mint signatures
  const testCalls = [
    {
      name: 'mint(uint256,address)',
      data: '0x94bf804d' + 
            '00000000000000000000000000000000000000000000000000007d1c2eef7000' + // amount
            '0000000000000000000000002f2a2543b76a4166549f7aab2e75bef0aefc5b0f', // WBTC address
    },
    {
      name: 'mint(uint256)',
      data: '0xa0712d68' + 
            '00000000000000000000000000000000000000000000000000007d1c2eef7000', // amount only
    },
    {
      name: 'mint(address,uint256)',
      data: '0x40c10f19' + 
            '00000000000000000000000066d5421f0bc20a55b068118bce225fc968ccf84f' + // user address
            '00000000000000000000000000000000000000000000000000007d1c2eef7000', // amount
    }
  ];
  
  for (const { name, data } of testCalls) {
    try {
      const result = await provider.call({
        to: WRAP_CONTRACT,
        from: TEST_USER,
        data: data,
      });
      console.log(`   ✅ ${name}: Success (returned ${result})`);
    } catch (error: any) {
      const errorMsg = error.message?.includes('execution reverted') ? 'Reverted' : error.reason || 'Failed';
      console.log(`   ❌ ${name}: ${errorMsg}`);
    }
  }
  
  // 3. Check WBTC token balance and allowance
  console.log('\n3. WBTC Token checks:');
  
  const wbtcABI = [
    'function balanceOf(address) view returns (uint256)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function decimals() view returns (uint8)',
  ];
  
  const wbtcContract = new ethers.Contract(WBTC_ADDRESS, wbtcABI, provider);
  
  try {
    const decimals = await wbtcContract.decimals();
    console.log(`   WBTC decimals: ${decimals}`);
    
    const balance = await wbtcContract.balanceOf(TEST_USER);
    console.log(`   User WBTC balance: ${balance.toString()} (${ethers.utils.formatUnits(balance, decimals)} WBTC)`);
    
    const allowance = await wbtcContract.allowance(TEST_USER, WRAP_CONTRACT);
    console.log(`   User allowance to contract: ${allowance.toString()} (${ethers.utils.formatUnits(allowance, decimals)} WBTC)`);
  } catch (error: any) {
    console.log('   Error reading WBTC token:', error.message);
  }
  
  // 4. Try to get the actual function selectors
  console.log('\n4. Checking contract functions:');
  
  // Common function selectors to test
  const functionSelectors = [
    { selector: '0x06fdde03', name: 'name()' },
    { selector: '0x95d89b41', name: 'symbol()' },
    { selector: '0x18160ddd', name: 'totalSupply()' },
    { selector: '0x8da5cb5b', name: 'owner()' },
    { selector: '0x5c975abb', name: 'paused()' },
    { selector: '0x94bf804d', name: 'mint(uint256,address)' },
    { selector: '0xa0712d68', name: 'mint(uint256)' },
    { selector: '0x40c10f19', name: 'mint(address,uint256)' },
  ];
  
  for (const { selector, name } of functionSelectors) {
    try {
      const result = await provider.call({
        to: WRAP_CONTRACT,
        data: selector,
      });
      console.log(`   ✅ ${name}: Exists`);
    } catch (error) {
      // Function doesn't exist or reverted
    }
  }
  
  // 5. Try a static call simulation
  console.log('\n5. Simulating mint transaction:');
  
  const mintABI = [
    'function mint(uint256 amount, address _WBTC)',
  ];
  
  const contract = new ethers.Contract(WRAP_CONTRACT, mintABI, provider);
  
  try {
    // Try to estimate gas
    const gasEstimate = await provider.estimateGas({
      to: WRAP_CONTRACT,
      from: TEST_USER,
      data: '0x94bf804d' + 
            '00000000000000000000000000000000000000000000000000007d1c2eef7000' +
            '0000000000000000000000002f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
    });
    console.log(`   Gas estimate: ${gasEstimate.toString()}`);
  } catch (error: any) {
    console.log(`   Gas estimation failed: ${error.reason || error.message}`);
    
    // Try to get more details about the revert
    if (error.error && error.error.data) {
      console.log(`   Revert data: ${error.error.data}`);
    }
  }
}

debugContract().catch(console.error);