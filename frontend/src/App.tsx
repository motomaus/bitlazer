import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { ToastContainer } from 'react-toastify'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import '@locales/index'
import i18n from '@locales/index'

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />

      <ToastContainer
        autoClose={3000}
        theme="dark"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        limit={1}
      />
    </I18nextProvider>
  )
}

export default App
