import { ethers } from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

async function fixAllowance() {
  if (!process.env.PRIVATE_KEY) {
    console.log('Please set PRIVATE_KEY in your .env file');
    console.log('');
    console.log('To fix the allowance manually:');
    console.log('1. Go to Arbiscan: https://arbiscan.io/address/0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f#writeContract');
    console.log('2. Connect your wallet');
    console.log('3. Find the "approve" function');
    console.log('4. Enter:');
    console.log('   spender: 0x0c978B2F8F3A0E399DaF5C41e4776757253EE5Df');
    console.log('   amount: 13756');
    console.log('5. Click "Write" and confirm the transaction');
    return;
  }

  const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
  const WRAP_CONTRACT = '0x0c978B2F8F3A0E399DaF5C41e4776757253EE5Df';
  const WBTC_ADDRESS = '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f';
  
  const wbtcABI = [
    'function balanceOf(address) view returns (uint256)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function decimals() view returns (uint8)',
  ];
  
  const wbtcContract = new ethers.Contract(WBTC_ADDRESS, wbtcABI, wallet);
  
  console.log('Fixing WBTC allowance...');
  console.log('Your address:', wallet.address);
  
  // Check current state
  const balance = await wbtcContract.balanceOf(wallet.address);
  const currentAllowance = await wbtcContract.allowance(wallet.address, WRAP_CONTRACT);
  
  console.log('Your WBTC balance:', balance.toString(), '(in 8 decimals)');
  console.log('Current allowance:', currentAllowance.toString());
  
  if (currentAllowance.toString() === balance.toString()) {
    console.log('✅ Allowance is already correct!');
    return;
  }
  
  // Reset to 0 first if needed
  if (!currentAllowance.isZero()) {
    console.log('Resetting allowance to 0...');
    const resetTx = await wbtcContract.approve(WRAP_CONTRACT, 0);
    console.log('Reset tx:', resetTx.hash);
    await resetTx.wait();
    console.log('✅ Reset complete');
  }
  
  // Set correct allowance
  console.log('Setting allowance to match balance:', balance.toString());
  const approveTx = await wbtcContract.approve(WRAP_CONTRACT, balance);
  console.log('Approve tx:', approveTx.hash);
  await approveTx.wait();
  
  // Verify
  const newAllowance = await wbtcContract.allowance(wallet.address, WRAP_CONTRACT);
  console.log('✅ New allowance:', newAllowance.toString());
  
  if (newAllowance.toString() === balance.toString()) {
    console.log('✅ SUCCESS! Allowance fixed. You can now wrap your WBTC.');
  } else {
    console.log('❌ Something went wrong. Allowance still incorrect.');
  }
}

fixAllowance().catch(console.error);