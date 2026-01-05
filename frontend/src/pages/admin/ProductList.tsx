import { API_URL, API_BASE_URL } from '../../config';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Edit } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    images: string[];
    sizes: string[];
}

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    // navigate removed

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_URL}/products`);

            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await fetch(`${API_URL}/products/${id}`, {

                    method: 'DELETE',
                });
                fetchProducts();
            } catch (error) {
                console.error('Failed to delete product', error);
            }
        }
    };

    const getImageUrl = (path: string) => {
        if (path.startsWith('http')) return path;
        return `${API_BASE_URL}${path}`;

    };

    return (
        <div>
            <header className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Products</h2>
                <Link to="/admin/products/add" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors">
                    <Plus size={20} />
                    <span className="hidden sm:inline">Add Product</span>
                </Link>
            </header>

            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-gray-800 text-gray-400">
                            <tr>
                                <th className="p-4">Image</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Sizes</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-800/50">
                                    <td className="p-4">
                                        <div className="w-16 h-16 bg-gray-800 rounded overflow-hidden">
                                            {product.images && product.images.length > 0 && (
                                                <img src={getImageUrl(product.images[0])} alt={product.name} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium max-w-xs truncate" title={product.name}>{product.name}</td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span>₹{product.price}</span>
                                            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-1 flex-wrap max-w-xs">
                                            {product.sizes.map(size => (
                                                <span key={size} className="text-xs bg-gray-800 border border-gray-700 px-2 py-1 rounded">{size}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                to={`/admin/products/edit/${product.id}`}
                                                className="text-gray-400 hover:text-blue-500 transition-colors p-2"
                                                title="Edit Product"
                                            >
                                                <Edit size={20} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                                title="Delete Product"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {products.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No products found. Add your first product!</div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
