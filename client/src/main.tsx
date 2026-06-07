import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ScrollToTop from './ScrollToTop.tsx'
import { CartProvider } from './context/CardContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <CartProvider>
    <App />
  <ScrollToTop/>
  </CartProvider>
  </BrowserRouter>,
)
