import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Gameinfo from './Components/Gameinfo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Gameinfo />
  </StrictMode>,
)
