import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="text-white pb-20 px-4 md:px-8 min-h-screen">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Privacy Policy</h1>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Effective Date</h2>
          <p className="text-gray-300 leading-relaxed">This Privacy Policy is effective as of [Date] and applies to our website and services.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
          <p className="text-gray-300 leading-relaxed mb-4">We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include your name, email address, shipping address, payment information, and any other information you choose to provide.</p>
          <p className="text-gray-300 leading-relaxed">We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, and browsing behavior.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
          <p className="text-gray-300 leading-relaxed mb-4">We use the information we collect to:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Provide customer service</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Information Sharing</h2>
          <p className="text-gray-300 leading-relaxed">We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
          <p className="text-gray-300 leading-relaxed">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
          <p className="text-gray-300 leading-relaxed">You have the right to access, update, or delete your personal information. You may also opt out of marketing communications at any time.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
          <p className="text-gray-300 leading-relaxed">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:redolicinfo@gmail.com" className="text-blue-400 hover:text-blue-300">redolicinfo@gmail.com</a>.</p>
        </section>
      </motion.div>
    </div>
  );
};

export default Privacy;