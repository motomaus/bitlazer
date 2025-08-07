import { ethers } from 'ethers';

async function testMintAmounts() {
  const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
  
  const WRAP_CONTRACT = '0x0c978B2F8F3A0E399DaF5C41e4776757253EE5Df';
  const WBTC_ADDRESS = '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f';
  const TEST_USER = '0x66D5421F0bc20A55b068118bCe225Fc968CcF84F';
  
  console.log('=== TESTING DIFFERENT MINT AMOUNTS ===\n');
  
  // Test different amount formats
  const testAmounts = [
    { name: '13756 (8 decimals)', value: '13756' },
    { name: '137560000000000 (18 decimals)', value: '137560000000000' },
    { name: '1375600 (maybe 6 decimals?)', value: '1375600' },
    { name: '137 (super small test)', value: '137' },
  ];
  
  // Function selector for mint(uint256,address)
  const mintSelector = '0x94bf804d';
  
  for (const { name, value } of testAmounts) {
    const amountHex = ethers.utils.hexZeroPad(ethers.BigNumber.from(value).toHexString(), 32).slice(2);
    const addressHex = ethers.utils.hexZeroPad(WBTC_ADDRESS, 32).slice(2).toLowerCase();
    
    const data = mintSelector + amountHex + addressHex;
    
    console.log(`Testing: ${name}`);
    console.log(`  Amount: ${value}`);
    console.log(`  Data: ${data.slice(0, 50)}...`);
    
    try {
      const result = await provider.call({
        to: WRAP_CONTRACT,
        from: TEST_USER,
        data: data,
      });
      console.log(`  ✅ Success! Result: ${result}`);
    } catch (error: any) {
      if (error.message?.includes('execution reverted')) {
        console.log(`  ❌ Reverted`);
        
        // Try to decode the error
        if (error.error?.data) {
          const errorData = error.error.data;
          if (errorData.startsWith('0x08c379a0')) {
            // Standard revert string
            try {
              const reason = ethers.utils.defaultAbiCoder.decode(['string'], '0x' + errorData.slice(10))[0];
              console.log(`     Reason: ${reason}`);
            } catch {}
          }
        }
      } else {
        console.log(`  ❌ Error: ${error.message}`);
      }
    }
    console.log('');
  }
  
  // Check WBTC balance and allowance again
  const wbtcABI = [
    'function balanceOf(address) view returns (uint256)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function decimals() view returns (uint8)',
  ];
  
  const wbtcContract = new ethers.Contract(WBTC_ADDRESS, wbtcABI, provider);
  
  console.log('=== CURRENT STATE ===');
  const balance = await wbtcContract.balanceOf(TEST_USER);
  const allowance = await wbtcContract.allowance(TEST_USER, WRAP_CONTRACT);
  const decimals = await wbtcContract.decimals();
  
  console.log(`WBTC Balance: ${balance.toString()} (${ethers.utils.formatUnits(balance, decimals)} WBTC)`);
  console.log(`Allowance: ${allowance.toString()} (${ethers.utils.formatUnits(allowance, decimals)} WBTC)`);
  
  // Check if the contract might need the exact allowance amount
  if (!balance.eq(allowance)) {
    console.log('\n⚠️  WARNING: Allowance does not match balance!');
    console.log('The contract might require allowance = exact amount to transfer');
  }
}

testMintAmounts().catch(console.error);