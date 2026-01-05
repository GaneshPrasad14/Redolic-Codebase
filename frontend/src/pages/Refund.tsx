import { motion } from 'framer-motion';

const Refund = () => {
  return (
    <div className="text-white pb-20 px-4 md:px-8 min-h-screen">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Refund Policy</h1>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Return Window</h2>
          <p className="text-gray-300 leading-relaxed">You have 7 days from the date of delivery to return items for a refund or exchange. Items must be unused, in their original packaging, and with all tags attached.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Eligibility for Returns</h2>
          <p className="text-gray-300 leading-relaxed">Not all items are eligible for return. Sale items, personalized items, and certain categories may not be returnable. Please check the product description for specific return policies.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">How to Initiate a Return</h2>
          <p className="text-gray-300 leading-relaxed">To initiate a return, please contact us at <a href="mailto:redolicinfo@gmail.com" className="text-blue-400 hover:text-blue-300">redolicinfo@gmail.com</a> with your order number and reason for return. We will provide you with a return authorization and shipping instructions.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Return Shipping</h2>
          <p className="text-gray-300 leading-relaxed">Customers are responsible for return shipping costs unless the item is defective or we made an error. We recommend using a trackable shipping service for your protection.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Refund Processing</h2>
          <p className="text-gray-300 leading-relaxed">Once we receive and inspect your returned item, we will process your refund within 5-7 business days. Refunds will be issued to the original payment method.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Exchanges</h2>
          <p className="text-gray-300 leading-relaxed">If you would like to exchange an item for a different size, color, or style, please contact us. Exchanges are subject to availability and may require additional shipping fees.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Damaged or Defective Items</h2>
          <p className="text-gray-300 leading-relaxed">If you receive a damaged or defective item, please contact us immediately. We will arrange for a replacement or full refund at no cost to you.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Non-Returnable Items</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Gift cards</li>
            <li>Personalized or custom items</li>
            <li>Items from clearance or final sale</li>
            <li>Items damaged due to misuse or normal wear</li>
          </ul>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
          <p className="text-gray-300 leading-relaxed">For any questions about our refund policy, please contact us at <a href="mailto:redolicinfo@gmail.com" className="text-blue-400 hover:text-blue-300">redolicinfo@gmail.com</a>.</p>
        </section>
      </motion.div>
    </div>
  );
};

export default Refund;