import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="text-white pb-20 px-4 md:px-8 min-h-screen">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Terms & Conditions</h1>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Acceptance of Terms</h2>
          <p className="text-gray-300 leading-relaxed">By accessing and using Redolic's website and services, you accept and agree to be bound by the terms and provision of this agreement.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Use License</h2>
          <p className="text-gray-300 leading-relaxed">Permission is granted to temporarily download one copy of the materials on Redolic's website for personal, non-commercial transitory viewing only.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Products and Services</h2>
          <p className="text-gray-300 leading-relaxed">All products and services are subject to availability. We reserve the right to discontinue any product or service at any time.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Pricing and Payment</h2>
          <p className="text-gray-300 leading-relaxed">All prices are subject to change without notice. Payment is due at the time of purchase. We accept various payment methods as indicated on our website.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Shipping and Delivery</h2>
          <p className="text-gray-300 leading-relaxed">We will make every effort to deliver products within the estimated timeframe, but we are not responsible for delays caused by factors beyond our control.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Returns and Refunds</h2>
          <p className="text-gray-300 leading-relaxed">Please refer to our Refund Policy for detailed information on returns and refunds.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">User Accounts</h2>
          <p className="text-gray-300 leading-relaxed">When you create an account with us, you must provide information that is accurate, complete, and current at all times.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Prohibited Uses</h2>
          <p className="text-gray-300 leading-relaxed">You may not use our products for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
          <p className="text-gray-300 leading-relaxed">In no event shall Redolic or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Governing Law</h2>
          <p className="text-gray-300 leading-relaxed">These terms and conditions are governed by and construed in accordance with the laws of [Jurisdiction], and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
          <p className="text-gray-300 leading-relaxed">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
          <p className="text-gray-300 leading-relaxed">If you have any questions about these Terms & Conditions, please contact us at <a href="mailto:redolicinfo@gmail.com" className="text-blue-400 hover:text-blue-300">redolicinfo@gmail.com</a>.</p>
        </section>
      </motion.div>
    </div>
  );
};

export default Terms;