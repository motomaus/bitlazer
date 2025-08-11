# Bitlazer Project Setup Guide

## Prerequisites

- **Node.js**: Version 20.x (required)
- **pnpm**: Version 9.x (required, enforced by preinstall script)
  ```bash
  npm install -g pnpm@9
  ```

## Project Structure

```
bitlazer/
├── frontend/              # Vite + React frontend application
│   ├── src/              # Source code
│   ├── dist/             # Build output
│   └── pnpm-lock.yaml    # Frontend lockfile
├── packages/
│   ├── app/              # Main application package
│   └── contracts/        # Smart contracts
├── scripts/              # Utility scripts
│   └── generate-abi.js   # ABI generation from contracts
└── .github_workflows/    # GitHub Actions workflows
```

## Initial Setup

### 1. Clone the repository
```bash
git clone https://github.com/bitlazer-io/bitlazer.git
cd bitlazer
```

### 2. Install dependencies

#### Root directory dependencies
```bash
pnpm install
```

#### Frontend dependencies
```bash
cd frontend
pnpm install
```

## Development

### Frontend Development

```bash
cd frontend
pnpm dev
```

The development server will start at `http://localhost:3000`

### Smart Contract Development

```bash
# Compile contracts
pnpm run contracts:compile

# Generate TypeScript ABIs for frontend
pnpm run abi:generate

# Or do both at once
pnpm run contracts:build

# Run tests
pnpm run contracts:test

# Run coverage
pnpm run coverage

# Start local Hardhat node
cd packages/contracts
pnpm run node
```

## Building for Production

### Frontend Build

```bash
cd frontend
pnpm build
```

Build output will be in `frontend/dist/`

### Smart Contracts Deployment

```bash
cd packages/contracts

# Deploy to local network
pnpm run deploy:hardhat

# Deploy to Sepolia testnet
pnpm run deploy:sepolia

# Deploy to mainnet
pnpm run deploy:mainnet
```