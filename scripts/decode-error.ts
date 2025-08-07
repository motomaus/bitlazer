import { ethers } from 'ethers';

const errorData = '0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001d46616c6c6261636b2066756e6374696f6e206e6f7420616c6c6f776564000000';

// Decode the error
const iface = new ethers.utils.Interface([
  'error Error(string)'
]);

try {
  const decoded = iface.parseError(errorData);
  console.log('Error message:', decoded.args[0]);
} catch (e) {
  // Try decoding as string directly
  const abiCoder = ethers.utils.defaultAbiCoder;
  const decoded = abiCoder.decode(['string'], '0x' + errorData.slice(10));
  console.log('Error message:', decoded[0]);
}

// Also decode the hex manually
const hexMessage = '46616c6c6261636b2066756e6374696f6e206e6f7420616c6c6f776564';
const message = Buffer.from(hexMessage, 'hex').toString();
console.log('Decoded hex:', message);
