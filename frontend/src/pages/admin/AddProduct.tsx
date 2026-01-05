import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { API_URL } from '../../config';

const AddProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
    });
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

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
            setImages(prev => [...prev, ...files]);

            const newPreviews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
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
            // Append sizes individually or as JSON string
            selectedSizes.forEach(size => data.append('sizes', size));

            images.forEach(image => {
                data.append('images', image);
            });

            const response = await fetch(`${API_URL}/products`, {

                method: 'POST',
                body: data,
            });

            if (response.ok) {
                navigate('/admin/products');
            } else {
                alert('Failed to create product');
            }
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Error creating product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <header className="flex items-center gap-4 mb-8">
                    <Link to="/admin/products" className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-bold">Add New Product</h1>
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
                            {imagePreviews.map((src, index) => (
                                <div key={index} className="relative w-32 h-32 rounded overflow-hidden border border-gray-700 group">
                                    <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={16} />
                                    </button>
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
                        {loading ? 'Creating Product...' : 'Create Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
