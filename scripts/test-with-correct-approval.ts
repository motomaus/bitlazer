import { ethers } from 'ethers';

async function testMint() {
  const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
  
  const WRAP_CONTRACT = '0x0c978B2F8F3A0E399DaF5C41e4776757253EE5Df';
  const WBTC_ADDRESS = '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f';
  const USER = '0x66D5421F0bc20A55b068118bCe225Fc968CcF84F';
  
  console.log('Testing mint with current approval...\n');
  
  // Check current state
  const wbtcABI = ['function balanceOf(address) view returns (uint256)', 'function allowance(address,address) view returns (uint256)'];
  const wbtc = new ethers.Contract(WBTC_ADDRESS, wbtcABI, provider);
  
  const balance = await wbtc.balanceOf(USER);
  const allowance = await wbtc.allowance(USER, WRAP_CONTRACT);
  
  console.log('WBTC Balance:', balance.toString());
  console.log('Current Allowance:', allowance.toString());
  console.log('');
  
  // Test mint with the exact allowance amount
  const mintSelector = '0x94bf804d';
  
  // Test with allowance amount (13756)
  const amount1 = allowance.toHexString().slice(2).padStart(64, '0');
  const address1 = WBTC_ADDRESS.slice(2).toLowerCase().padStart(64, '0');
  const data1 = mintSelector + amount1 + address1;
  
  console.log('Test 1: Mint with exact allowance (13756)');
  try {
    await provider.call({ to: WRAP_CONTRACT, from: USER, data: data1 });
    console.log('✅ Would succeed!\n');
  } catch (e) {
    console.log('❌ Would fail\n');
  }
  
  // Test with 18-decimal amount
  const amount2 = ethers.BigNumber.from('137560000000000').toHexString().slice(2).padStart(64, '0');
  const data2 = mintSelector + amount2 + address1;
  
  console.log('Test 2: Mint with 18-decimal amount (137560000000000)');
  try {
    await provider.call({ to: WRAP_CONTRACT, from: USER, data: data2 });
    console.log('✅ Would succeed!\n');
  } catch (e) {
    console.log('❌ Would fail\n');
  }
}

testMint().catch(console.error);