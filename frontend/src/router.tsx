import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import NotFoundPage from '@pages/NotFoundPage'
import IndexPage from '@pages/IndexPage'
import { MainLayout } from '@layouts/index'
import ConnectWalletPage from '@pages/ConnectWalletPage'
import BridgePage from '@pages/BridgePage'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<MainLayout />}>
        <Route element={<IndexPage />} path="/" />
        <Route element={<ConnectWalletPage />} path="/connect-wallet" />
        <Route element={<BridgePage />} path="/bridge" />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
)
