import { type Chain } from 'viem'

export const devnet = {
    id: 40670607008,
    name: 'Bitlazer Devnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['http://devnet.bitlazer.io:8449'] },
    },
} as const satisfies Chain