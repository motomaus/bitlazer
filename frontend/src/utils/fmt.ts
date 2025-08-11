export function fmtHash(address: string, start = 10, end = -6) {
  return `${address?.slice(0, start)}...${address?.slice(end)}`
}

export function fmtCryptoAddress(address: string) {
  return `${address?.slice(0, 6)}...${address?.slice(-4)}`
}
