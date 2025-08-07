import { ethers } from 'ethers';

async function checkContract() {
  const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
  const WRAP_CONTRACT = '0x0c978B2F8F3A0E399DaF5C41e4776757253EE5Df';
  
  // Try to get the bytecode
  const code = await provider.getCode(WRAP_CONTRACT);
  console.log('Contract has code:', code.length > 2);
  console.log('');
  
  // Check if mint function exists by trying different selectors
  const selectors = [
    { name: 'mint(uint256,address)', selector: '0x94bf804d' },
    { name: 'mint(address,uint256)', selector: '0x40c10f19' },
    { name: 'deposit(uint256,address)', selector: '0x47e7ef24' },
    { name: 'wrap(uint256,address)', selector: '0x8e8f294b' },
  ];
  
  console.log('Testing function selectors:');
  for (const { name, selector } of selectors) {
    const data = selector + '0000000000000000000000000000000000000000000000000000000000000001' + '0000000000000000000000002f2a2543b76a4166549f7aab2e75bef0aefc5b0f';
    try {
      await provider.call({
        to: WRAP_CONTRACT,
        data: data,
        from: '0x66D5421F0bc20A55b068118bCe225Fc968CcF84F'
      });
      console.log(`✅ ${name} seems to exist`);
    } catch (e: any) {
      const errorMsg = e.reason || e.message || '';
      if (errorMsg.includes('Fallback')) {
        console.log(`❌ ${name} - function doesn't exist (fallback error)`);
      } else {
        console.log(`⚠️  ${name} - exists but reverts`);
      }
    }
  }
}

checkContract().catch(console.error);
