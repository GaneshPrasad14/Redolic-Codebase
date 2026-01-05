import { API_URL, API_BASE_URL } from '../config';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useCart } from '../CartContext';
import SizeChartModal from '../components/SizeChartModal';

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  originalPrice: number;
  sizes: string[];
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`);

      if (!response.ok) throw new Error('Product not found');
      const data = await response.json();
      setProduct(data);
      // Set default size if available
      if (data.sizes && data.sizes.length > 0) {
        setSelectedSize(data.sizes[0]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${API_BASE_URL}${path}`;

  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-white">Product not found</div>;
  }

  const savings = product.originalPrice - product.price;

  return (
    <div className="product-detail min-h-screen pb-20 px-4 md:px-8 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <button
          onClick={() => navigate('/categories')}
          className="flex items-center gap-2 mb-8 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Collections
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              className="aspect-square overflow-hidden rounded-lg border border-gray-700"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={getImageUrl(product.images[selectedImage])}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-2 flex-wrap">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded border-2 overflow-hidden ${selectedImage === index
                    ? 'border-red-500'
                    : 'border-gray-600 hover:border-gray-400'
                    }`}
                >
                  <img
                    src={getImageUrl(image)}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Image failed to load:', image);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {product.name}
              </h1>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-red-500">
                  ₹{product.price}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="text-sm bg-green-500 text-white px-2 py-1 rounded">
                  Save ₹{savings}
                </span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold text-white">Size</h3>
                <button
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-sm underline text-white hover:text-gray-300 transition-colors"
                >
                  SIZE CHART
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded transition-colors ${selectedSize === size
                      ? 'border-red-500 bg-red-500 text-white'
                      : 'border-gray-600 text-gray-300 hover:border-gray-400'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-white">Quantity</h3>
              <div className="flex items-center border border-gray-600 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-800 text-white transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 text-white font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-800 text-white transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>


            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    size: selectedSize,
                    image: getImageUrl(product.images[0]),
                    quantity: quantity
                  });
                  navigate('/cart');
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    size: selectedSize,
                    image: getImageUrl(product.images[0]),
                    quantity: quantity
                  });
                  navigate('/cart');
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Buy Now
              </button>
            </div>

            {/* Product Details Section */}
            <div className="border-t border-gray-700 pt-6">
              <button
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                className="flex items-center justify-between w-full group"
              >
                <span className="text-lg font-semibold text-white group-hover:text-gray-200 transition-colors">
                  PRODUCT DETAILS
                </span>
                {isDetailsOpen ? (
                  <Minus size={20} className="text-gray-400 group-hover:text-white" />
                ) : (
                  <Plus size={20} className="text-gray-400 group-hover:text-white" />
                )}
              </button>
              <AnimatePresence>
                {isDetailsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 text-gray-300 text-base leading-relaxed whitespace-pre-line">
                      {product.description}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        </div>
      </motion.div>
      <SizeChartModal isOpen={isSizeChartOpen} onClose={() => setIsSizeChartOpen(false)} />
    </div>
  );
};

export default ProductDetail;