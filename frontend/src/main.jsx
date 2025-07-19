import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FareCalc from './farecalc.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <FareCalc /> */}
  </StrictMode>,
)
