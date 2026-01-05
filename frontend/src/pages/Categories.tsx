import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useState, useEffect } from 'react';
import { API_URL, API_BASE_URL } from '../config';


interface Product {
  id: string; // Changed to string as Mongo ID is string
  name: string;
  description: string;
  images: string[];
  price: number;
  originalPrice: number;
  sizes: string[];
}

const Categories = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (path: string) => {
    if (path.startsWith('http')) return path; // Already absolute
    return `${API_BASE_URL}${path}`;

  };

  return (
    <div className="categories min-h-screen">
      <section className="categories-hero">
        <motion.div
          className="categories-hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="categories-title">
            EXPLORE <span className="text-accent">COLLECTIONS</span>
          </h1>
          <p className="categories-subtitle">
            Discover pieces that define your style
          </p>
        </motion.div>
      </section>

      <section className="categories-grid-section">
        {loading ? (
          <div className="flex justify-center items-center h-64 text-white">Loading products...</div>
        ) : (
          <div className="categories-grid">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="product-card cursor-hover mb-4">
                  <Link to={`/product/${product.id}`}>
                    <div className="product-card-image">
                      {product.images && product.images.length > 0 ? (
                        <>
                          <img src={getImageUrl(product.images[0])} alt={product.name} className="product-image" />
                          <img src={getImageUrl(product.images[1] || product.images[0])} alt={product.name} className="product-image-hover" />
                        </>
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">No Image</div>
                      )}
                    </div>
                  </Link>
                </div>
                <div className="product-card-content">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="product-card-title">{product.name}</h3>
                  </Link>
                  <p className="product-card-price">
                    <span className="original-price">₹{product.originalPrice}</span>
                    <span className="offer-price">₹{product.price}</span>
                  </p>
                  <div className="product-buttons">
                    <button
                      className="cart-button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          size: product.sizes[0] || 'M',
                          image: product.images && product.images.length > 0 ? getImageUrl(product.images[0]) : '',
                        });
                        navigate('/cart');
                      }}
                    >
                      Add to Cart
                    </button>
                    <Link to={`/product/${product.id}`}>
                      <button className="buy-button">Buy Now</button>
                    </Link>
                  </div>
                  <Link to={`/product/${product.id}`} className="block mt-4">
                    <button className="w-full py-3 bg-white text-black hover:bg-gray-200 transition-colors rounded font-bold text-sm tracking-wider uppercase shadow-lg">
                      TAP TO ORDER
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="cta-section">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="cta-title">CAN'T FIND WHAT YOU'RE LOOKING FOR?</h2>
          <p className="cta-description">
            We're constantly updating our collection with fresh designs
          </p>
          <button className="cta-button cursor-hover">
            NOTIFY ME
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default Categories;
