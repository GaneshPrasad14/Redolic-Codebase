import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { API_URL, API_BASE_URL } from '../../config';

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
    });
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`${API_URL}/products/${id}`);

            if (!response.ok) throw new Error('Failed to fetch product');
            const data = await response.json();

            setFormData({
                name: data.name,
                description: data.description,
                price: data.price,
                originalPrice: data.originalPrice,
            });
            setSelectedSizes(data.sizes || []);
            setExistingImages(data.images || []);
        } catch (error) {
            console.error('Error fetching product:', error);
            setFetchError('Failed to load product details');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleSize = (size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setNewImages(prev => [...prev, ...files]);

            const newPreviews = files.map(file => URL.createObjectURL(file));
            setNewImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    // Remove existing image (from backend)
    const removeExistingImage = (index: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    // Remove newly added image (from local state)
    const removeNewImage = (index: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
        setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const getImageUrl = (path: string) => {
        if (path.startsWith('http')) return path;
        return `${API_BASE_URL}${path}`;

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('originalPrice', formData.originalPrice);

            // Append sizes
            selectedSizes.forEach(size => data.append('sizes', size));

            // Append existing images that were NOT removed
            existingImages.forEach(img => data.append('existingImages', img));

            // Append newly uploaded images
            newImages.forEach(image => {
                data.append('images', image);
            });

            const response = await fetch(`${API_URL}/products/${id}`, {

                method: 'PUT', // Using PUT for update
                body: data,
            });

            if (response.ok) {
                navigate('/admin/products');
            } else {
                alert('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product');
        } finally {
            setLoading(false);
        }
    };

    if (fetchError) return <div className="text-white p-8">{fetchError}</div>;

    return (
        <div className="">
            <header className="flex items-center gap-4 mb-8">
                <Link to="/admin/products" className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold">Edit Product</h1>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8 bg-gray-900 p-8 rounded-lg border border-gray-800">
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold border-b border-gray-800 pb-2">Basic Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-gray-400 mb-2">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded p-3 focus:border-red-500 outline-none"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-gray-400 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full bg-gray-800 border border-gray-700 rounded p-3 focus:border-red-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Price (₹)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded p-3 focus:border-red-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Original Price (₹)</label>
                            <input
                                type="number"
                                name="originalPrice"
                                value={formData.originalPrice}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded p-3 focus:border-red-500 outline-none"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold border-b border-gray-800 pb-2">Sizes</h3>
                    <div className="flex gap-4 flex-wrap">
                        {sizes.map(size => (
                            <button
                                key={size}
                                type="button"
                                onClick={() => toggleSize(size)}
                                className={`w-12 h-12 rounded border-2 font-bold transition-all ${selectedSizes.includes(size)
                                    ? 'bg-red-600 border-red-600 text-white'
                                    : 'border-gray-700 text-gray-400 hover:border-gray-500'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold border-b border-gray-800 pb-2">Images</h3>
                    <div className="flex gap-4 flex-wrap">
                        {/* Existing Images */}
                        {existingImages.map((src, index) => (
                            <div key={`existing-${index}`} className="relative w-32 h-32 rounded overflow-hidden border border-gray-700 group">
                                <img src={getImageUrl(src)} alt={`Existing ${index}`} className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeExistingImage(index)}
                                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}

                        {/* New Uploads */}
                        {newImagePreviews.map((src, index) => (
                            <div key={`new-${index}`} className="relative w-32 h-32 rounded overflow-hidden border border-green-700 group">
                                <img src={src} alt={`New Preview ${index}`} className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeNewImage(index)}
                                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={16} />
                                </button>
                                <span className="absolute bottom-1 left-1 bg-green-900 text-xs px-1 rounded">New</span>
                            </div>
                        ))}

                        <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded cursor-pointer hover:border-gray-500 transition-colors">
                            <Upload className="text-gray-400 mb-2" />
                            <span className="text-sm text-gray-400">Add Image</span>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded font-bold text-lg transition-colors ${loading
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                >
                    {loading ? 'Updating Product...' : 'Update Product'}
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
