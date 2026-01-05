import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet, useOutletContext } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import AuraBackground from './components/AuraBackground';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Shipping from './pages/Shipping';
import Refund from './pages/Refund';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductList from './pages/admin/ProductList';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';

import { CartProvider } from './CartContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Wrapper for Home to handle the prop passing since we are using Outlet
const HomeWithTrigger = () => {
  const { setPlayTrigger } = useOutletContext<{ setPlayTrigger: (v: boolean) => void }>();
  return <Home onExplore={() => setPlayTrigger(true)} />;
};

// Public Layout Component
const PublicLayout = () => {
  const [musicOpen, setMusicOpen] = useState(false);
  const [playTrigger, setPlayTrigger] = useState(false);

  // Custom Cursor effect specific to public layout
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Global interaction listener to start music
  useEffect(() => {
    const handleInteraction = () => {
      setPlayTrigger(true);
      // We only need to trigger this once, then the user has "interacted" with the DOM
      // The MusicPlayer will handle the rest (if already playing, it will ignore)
      window.removeEventListener('click', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
    };
  }, []);

  return (
    <div className="app flex flex-col min-h-screen bg-black">
      <CustomCursor />
      <AuraBackground />
      <MusicPlayer open={musicOpen} playTrigger={playTrigger} onPlayed={() => setPlayTrigger(false)} />
      <Navigation onMusicToggle={() => setMusicOpen(!musicOpen)} />
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        <main className="flex-grow">
          <Outlet context={{ setPlayTrigger }} />
        </main>
        <Footer className="mt-auto" />
      </div>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          {loading ? (
            <Preloader onComplete={() => setLoading(false)} />
          ) : (
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Area */}
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<ProductList />} />
                <Route path="/admin/products/add" element={<AddProduct />} />
                <Route path="/admin/products/edit/:id" element={<EditProduct />} />
              </Route>

              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomeWithTrigger />} />
                <Route path="/about" element={<About />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/refund" element={<Refund />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/product/:id" element={<ProductDetail />} />
              </Route>
            </Routes>
          )}
        </AnimatePresence>
      </Router>
    </CartProvider>
  );
}

export default App;
