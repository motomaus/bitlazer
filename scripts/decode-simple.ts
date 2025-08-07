import { ethers } from 'ethers';

const errorData = '0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001d46616c6c6261636b2066756e6374696f6e206e6f7420616c6c6f776564000000';

// The error selector 0x08c379a0 is for Error(string)
// Skip the selector and decode the rest
const abiCoder = ethers.utils.defaultAbiCoder;
const decoded = abiCoder.decode(['string'], '0x' + errorData.slice(10));
console.log('Error message:', decoded[0]);
