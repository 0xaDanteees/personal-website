import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The build prerenders static markup into #root. Hydrating it preserves that
// HTML for the crawlers that read it, instead of throwing it away and painting
// from scratch. `createRoot` remains the path for dev, where #root is empty.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
