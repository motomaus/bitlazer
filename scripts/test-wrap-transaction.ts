import { ethers } from 'ethers';

async function testWrap() {
  const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
  
  const WRAP_CONTRACT = '0x0c978B2F8F3A0E399DaF5C41e4776757253EE5Df';
  const WBTC_ADDRESS = '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f';
  const USER = '0x66D5421F0bc20A55b068118bCe225Fc968CcF84F';
  
  console.log('Testing wrap transaction...\n');
  
  // Check balances and allowance
  const wbtcABI = [
    'function balanceOf(address) view returns (uint256)', 
    'function allowance(address,address) view returns (uint256)',
    'function decimals() view returns (uint8)'
  ];
  const wbtc = new ethers.Contract(WBTC_ADDRESS, wbtcABI, provider);
  
  const lzrBTCABI = ['function balanceOf(address) view returns (uint256)'];
  const lzrBTC = new ethers.Contract(WRAP_CONTRACT, lzrBTCABI, provider);
  
  const wbtcBalance = await wbtc.balanceOf(USER);
  const allowance = await wbtc.allowance(USER, WRAP_CONTRACT);
  const lzrBalance = await lzrBTC.balanceOf(USER);
  
  console.log('Current State:');
  console.log('WBTC Balance:', wbtcBalance.toString(), '(8 decimals)');
  console.log('WBTC Allowance:', allowance.toString());
  console.log('lzrBTC Balance:', lzrBalance.toString(), '(18 decimals)');
  console.log('lzrBTC Balance formatted:', ethers.utils.formatUnits(lzrBalance, 18));
  console.log('');
  
  // Test mint with 18-decimal amount
  const mintABI = [
    {
      inputs: [
        { name: "amount", type: "uint256" },
        { name: "_WBTC", type: "address" }
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    }
  ];
  
  const contract = new ethers.Contract(WRAP_CONTRACT, mintABI, provider);
  
  // The amount to mint (0.00013756 WBTC in 18 decimals)
  const amountToMint = ethers.BigNumber.from('137560000000000');
  
  console.log('Attempting mint with:');
  console.log('Amount:', amountToMint.toString(), '(18 decimals for contract)');
  console.log('WBTC Address:', WBTC_ADDRESS);
  console.log('');
  
  try {
    // Encode the transaction
    const txData = contract.interface.encodeFunctionData('mint', [amountToMint, WBTC_ADDRESS]);
    
    console.log('Transaction data:', txData);
    console.log('');
    
    // Try static call
    const result = await provider.call({
      to: WRAP_CONTRACT,
      from: USER,
      data: txData
    });
    
    console.log('✅ Static call succeeded\! Result:', result);
    console.log('Transaction should work\!');
    
    // Estimate gas
    try {
      const gasEstimate = await provider.estimateGas({
        to: WRAP_CONTRACT,
        from: USER,
        data: txData
      });
      console.log('Gas estimate:', gasEstimate.toString());
    } catch (gasError: any) {
      console.log('❌ Gas estimation failed:', gasError.reason || gasError.message);
    }
    
  } catch (error: any) {
    console.log('❌ Static call failed\!');
    console.log('Error:', error.reason || error.message);
    
    // Try to decode the error
    if (error.data) {
      console.log('Error data:', error.data);
    }
  }
}

testWrap().catch(console.error);
