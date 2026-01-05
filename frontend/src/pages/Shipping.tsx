import { motion } from 'framer-motion';

const Shipping = () => {
  return (
    <div className="text-white pb-20 px-4 md:px-8 min-h-screen">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Shipping Policy</h1>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Processing Time</h2>
          <p className="text-gray-300 leading-relaxed">Orders are typically processed within 1-2 business days. During peak seasons or holidays, processing may take longer.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Shipping Methods</h2>
          <p className="text-gray-300 leading-relaxed">We offer various shipping options including standard, express, and overnight delivery. Shipping costs and delivery times vary based on your location and the selected method.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Shipping Rates</h2>
          <p className="text-gray-300 leading-relaxed">Shipping rates are calculated at checkout based on the weight of your order, shipping method, and destination. Free shipping may be available on orders over a certain amount.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Delivery Times</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
            <li>Standard Shipping: 5-7 business days</li>
            <li>Express Shipping: 2-3 business days</li>
            <li>Overnight Shipping: 1 business day</li>
          </ul>
          <p className="text-gray-300 leading-relaxed">Delivery times do not include weekends or holidays.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">International Shipping</h2>
          <p className="text-gray-300 leading-relaxed">We ship internationally. International orders may be subject to customs duties, taxes, and fees, which are the responsibility of the recipient.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Order Tracking</h2>
          <p className="text-gray-300 leading-relaxed">Once your order ships, you will receive a tracking number via email. You can use this number to track your package on our website or the carrier's website.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Damaged or Lost Packages</h2>
          <p className="text-gray-300 leading-relaxed">If your package arrives damaged or is lost in transit, please contact us immediately at <a href="mailto:redolicinfo@gmail.com" className="text-blue-400 hover:text-blue-300">redolicinfo@gmail.com</a>. We will work with the carrier to resolve the issue.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
          <p className="text-gray-300 leading-relaxed">For any shipping-related questions, please contact us at <a href="mailto:redolicinfo@gmail.com" className="text-blue-400 hover:text-blue-300">redolicinfo@gmail.com</a>.</p>
        </section>
      </motion.div>
    </div>
  );
};

export default Shipping;