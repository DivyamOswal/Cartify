import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ScrollToTop from './ScrollToTop.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <ScrollToTop/>
    <App />
  </BrowserRouter>,
)
