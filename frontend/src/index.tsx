import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@styles/index.css'
import '@styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'normalize.css'
import 'overlayscrollbars/overlayscrollbars.css'
import posthog from 'posthog-js'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

posthog.init('phc_wjftVjofBzfM8NVLuG9RE1IjFVtqVk3jvxRNK0NUups', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'identified_only',
})

window.addEventListener('vite:preloadError', (event: Event) => {
  const customEvent = event as CustomEvent<{ message: string }>

  console.error('Vite preload error:', customEvent.detail.message, '\n', customEvent)
  window.location.reload()
})

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
