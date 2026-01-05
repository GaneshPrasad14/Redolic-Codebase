import { motion } from 'framer-motion';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart min-h-screen pb-20">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          YOUR <span className="text-accent">CART</span>
        </motion.h1>

        {cart.length === 0 ? (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ShoppingBag size={64} className="mx-auto mb-6 text-gray-400" />
            </motion.div>
            <motion.p
              className="text-xl text-gray-400 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Your cart is currently empty
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link
                to="/categories"
                className="inline-flex items-center px-8 py-4 bg-accent text-black font-bold rounded-lg hover:bg-accent/80 transition-colors cursor-hover"
              >
                CONTINUE SHOPPING
              </Link>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center gap-4 bg-gray-900 p-4 rounded-lg"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-gray-400">Size: {item.size}</p>
                    <p className="text-accent">₹{item.price} x {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="bg-gray-900 p-6 rounded-lg h-fit"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="w-full block text-center px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors cursor-hover"
              >
                PROCEED TO CHECKOUT
              </Link>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;