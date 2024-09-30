import React, { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { ToastContainer } from 'react-toastify'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import '@locales/index'
import i18n from '@locales/index'

// Web3
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider, useConnect, useAccount, CreateConnectorFn, createConfig, http } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import { arbitrum, sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = 'ae140b2d150397e3e8c039cc1debc614'

// 2. Create wagmiConfig
const metadata = {
  name: 'Bitlazer',
  description: 'Bitlazer DApp',
  url: 'http://localhost:3000', // origin must match your domain & subdomain
  icons: []
}

const chains = [arbitrum, sepolia] as const
const connectors: CreateConnectorFn[] = []
connectors.push(walletConnect({ projectId, metadata, showQrModal: true }))

const newConfig = createConfig({
  chains,
  transports: {
    [arbitrum.id]: http(),
    [sepolia.id]: http(),
  },
  connectors
})

const config = defaultWagmiConfig({
  chains,
  projectId,
  auth: {
    email: false,
    socials: [],
    showWallets: true,
    walletFeatures: false,
  },
  metadata,
  connectors
})
// End of Web3

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <WagmiProvider config={newConfig}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />

          <ToastContainer
            autoClose={3000}
            theme="dark"
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            limit={1}
          />
        </QueryClientProvider>
      </WagmiProvider>
    </I18nextProvider>
  )
}

export default App
