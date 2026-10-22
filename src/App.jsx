import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { StoreProvider } from './context/StoreContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Drawers from './components/Drawers'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import Contact from './pages/Contact'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Account from './pages/Account'
import Checkout from './pages/Checkout'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Shell() {
  return (
    <div className="app">
      <ScrollTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/all" element={<Catalog />} />
        <Route path="/catalog" element={<Navigate to="/collections/all" replace />} />
        <Route path="/shop" element={<Navigate to="/collections/all" replace />} />
        <Route path="/products/:handle" element={<Product />} />
        <Route path="/pages/contact" element={<Contact />} />
        <Route path="/pages/about" element={<About />} />
        <Route path="/contact" element={<Navigate to="/pages/contact" replace />} />
        <Route path="/about" element={<Navigate to="/pages/about" replace />} />
        <Route path="/policies/privacy-policy" element={<Privacy />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <Drawers />
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </StoreProvider>
  )
}
