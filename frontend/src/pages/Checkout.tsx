import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  // selectedPayment state removed
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [email, setEmail] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    city: '',
    pincode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!(window as any).Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        setRazorpayLoaded(true);
      };

      script.onerror = () => {
        console.error('Failed to load Razorpay script');
      };
      document.head.appendChild(script);
    } else {
      setRazorpayLoaded(true);
    }
  }, []);

  const handlePlaceOrder = async () => {
    alert('Please use the "Pay with Razorpay" button above to complete your payment.');
  };

  return (
    <div className="checkout min-h-screen pb-20">
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
          CHECK<span className="text-accent">OUT</span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            className="bg-gray-900 p-6 rounded-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-gray-400 text-sm">Size: {item.size} | Qty: {item.quantity}</p>
                  </div>
                  <span className="text-accent">₹{item.price * item.quantity}</span>
                </motion.div>
              ))}
            </div>
            <div className="border-t border-gray-700 mt-4 pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </motion.div>

          {/* Checkout Form */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={shippingInfo.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                />
                <input
                  type="text"
                  name="lastName"
                  value={shippingInfo.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none md:col-span-2"
                  required
                />
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none md:col-span-2"
                />
                <input
                  type="tel"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Mobile Number"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                />
                <input
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                />
                <input
                  type="text"
                  name="pincode"
                  value={shippingInfo.pincode}
                  onChange={handleInputChange}
                  placeholder="PIN Code"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-4">
                {/* Razorpay Standard Checkout Button */}
                <div className="text-center flex items-center justify-center gap-4">
                  <img src="/PhonePe.png" alt="PhonePe" className="h-8 w-auto" />
                  <button
                    id="rzp-button1"
                    className="bg-[#3266cc] text-white border border-[#3266cc] px-5 py-2.5 rounded font-medium cursor-pointer hover:bg-[#2c5aa0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!razorpayLoaded || !email}
                    title={!email ? "Please enter email" : ""}
                    onClick={async () => {
                      if (!email) {
                        alert('Please enter your email address');
                        return;
                      }
                      // Simple validation for shipping
                      if (!shippingInfo.address || !shippingInfo.city || !shippingInfo.phone) {
                        alert('Please fill in your shipping details (Address, City, Phone)');
                        return;
                      }

                      try {
                        const response = await fetch(`${API_URL}/create-order`, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            amount: total,
                          }),
                        });

                        const data = await response.json();

                        if (!data.success) {
                          alert('Failed to create order: ' + (data.message || 'Unknown error'));
                          return;
                        }

                        const options = {
                          key: data.key,
                          amount: data.amount,
                          currency: data.currency,
                          name: 'Redolic',
                          description: 'Purchase from Redolic',
                          handler: async function (response: any) {
                            try {
                              await fetch(`${API_URL}/save-order`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  items: cart,
                                  total,
                                  paymentMethod: 'razorpay',
                                  paymentId: response.razorpay_payment_id,
                                  userEmail: email, // Sending captured email
                                  shippingInfo: shippingInfo, // Sending shipping info
                                }),
                              });
                              alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
                              clearCart();
                            } catch (error) {
                              alert('Payment successful but failed to save order');
                              clearCart();
                            }
                          },
                          prefill: {
                            name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
                            email: email,
                            contact: shippingInfo.phone,
                          },
                          theme: {
                            color: '#D40000',
                          },
                        };

                        const rzp = new (window as any).Razorpay(options);
                        rzp.open();
                      } catch (error) {
                        console.error('Error placing order:', error);
                        alert('Failed to place order: ' + (error as Error).message);
                      }
                    }}
                  >
                    Pay with Razorpay
                  </button>
                  <img src="/GPay.png" alt="Google Pay" className="h-8 w-auto" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg">
              <Shield size={24} className="text-accent" />
              <div>
                <h3 className="font-semibold text-white">Secure Checkout</h3>
                <p className="text-gray-400 text-sm">Your payment information is encrypted and secure</p>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full px-8 py-4 bg-accent text-black font-bold rounded-lg hover:bg-accent/80 transition-colors cursor-hover"
            >
              PAY WITH RAZORPAY - ₹{total}
            </button>

            <Link
              to="/cart"
              className="block text-center text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Cart
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;