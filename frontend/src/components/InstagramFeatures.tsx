import { ShoppingCart, CheckCircle, Headset, Smartphone, Instagram } from 'lucide-react';

const InstagramFeatures = () => {
  return (
    <div className="w-full bg-white">
      {/* Instagram Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Follow us on Instagram</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join the REDOLIC movement. Stay updated with our latest oversized T-shirt collections and streetwear inspirations.
          </p>
          <a
            href="https://www.instagram.com/redolic.in?igsh=YWF6dXF6bDNoeXRi&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Visit our Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>

        {/* Features Section */}
        <div className="bg-black text-white py-12 px-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-full mb-4">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pan India Shipping</h3>
              <p className="text-gray-300">We deliver everywhere</p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">High Quality Material</h3>
              <p className="text-gray-300">100% Quality Guarantee</p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-full mb-4">
                <Headset className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Online Support</h3>
              <p className="text-gray-300">24 hours a day, 7 days a week</p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-full mb-4">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Secure Payment</h3>
              <p className="text-gray-300">Payments are 100% Secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramFeatures;
