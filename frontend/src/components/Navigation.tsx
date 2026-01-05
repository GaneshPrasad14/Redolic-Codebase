import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import WaveIcon from './WaveIcon';
import { useCart } from '../CartContext';
import { useState, useRef } from 'react';
import Particles from './Particles';

interface NavigationProps {
  onMusicToggle: () => void;
}

const Navigation = ({ onMusicToggle }: NavigationProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'ABOUT', path: '/about' },
    { name: 'CATEGORY', path: '/categories' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <motion.nav
      className="navigation relative"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="nav-container relative z-10 text-black">
        <Link to="/" className="logo cursor-hover">
          <img src="/h.png" alt="Logo" className="w-32 h-18 object-contain" />
        </Link>

        <div className="flex items-center ml-auto">
          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Go to cart"
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            onClick={onMusicToggle}
            aria-label="Toggle music panel"
          >
            <WaveIcon />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
             className="absolute top-full right-0 w-full md:w-48 bg-white border border-gray-200 shadow-lg z-40 rounded-md"
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             transition={{ duration: 0.2, ease: 'easeInOut' }}
           >
            <nav className="py-2">
              <div className="container mx-auto px-4">
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to={link.path}
                        className={`block px-4 py-3 rounded-lg text-lg w-full text-left ${
                          location.pathname === link.path
                            ? 'bg-gray-200 text-black'
                            : 'text-gray-700 hover:bg-gray-200 hover:text-black'
                        } transition-colors`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
