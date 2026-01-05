import { API_URL, API_BASE_URL } from '../../config';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Order {
    _id: string;
    items: any[];
    total: number;
    status: string;
    paymentMethod: string;
    date: string;
    userEmail?: string;
    createdAt?: string;
    shippingInfo?: {
        firstName: string;
        lastName: string;
        address: string;
        phone: string;
        city: string;
        pincode: string;
    };
}

const AdminDashboard = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchOrders();
    }, [navigate]);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${API_URL}/orders`);

            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        }
    };

    const getImageUrl = (path: string) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        return `${API_BASE_URL}${path}`;

    };

    return (
        <div>
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h2 className="text-3xl font-bold">Recent Orders</h2>
            </header>

            <div className="grid gap-6">
                {orders.length === 0 ? (
                    <div className="text-gray-500 bg-gray-900 p-8 rounded-lg text-center border border-gray-800">
                        No orders found.
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-sm hover:border-gray-700 transition-colors">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b border-gray-800 pb-4 gap-4">
                                <div>
                                    <p className="text-sm text-gray-400">Order ID</p>
                                    <p className="font-mono text-sm md:text-base break-all">{order._id}</p>
                                </div>
                                <div className="md:text-right">
                                    <p className="text-sm text-gray-400">Date</p>
                                    <p>{new Date(order.createdAt || order.date).toLocaleDateString()} {new Date(order.createdAt || order.date).toLocaleTimeString()}</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-4">
                                {order.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex items-center gap-4 bg-gray-950/50 p-3 rounded">
                                        <div className="w-12 h-12 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                                            {item.image &&
                                                <img
                                                    src={getImageUrl(item.image)}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            }
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{item.name}</p>
                                            <p className="text-sm text-gray-400">Size: {item.size} | Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium whitespace-nowrap">₹{item.price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4 border-t border-gray-800 gap-4">
                                <div>
                                    <p className="text-sm text-gray-400">Customer</p>
                                    <p className="break-all">{order.userEmail || 'N/A'}</p>

                                    {/* Shipping Info Display */}
                                    {order.shippingInfo && (
                                        <div className="mt-2 text-sm">
                                            <p className="font-semibold text-gray-300">Shipping To:</p>
                                            <p>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</p>
                                            <p>{order.shippingInfo.address}</p>
                                            <p>{order.shippingInfo.city}, {order.shippingInfo.pincode}</p>
                                            <p>Phone: {order.shippingInfo.phone}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-8 w-full md:w-auto justify-between md:justify-end">
                                    <div>
                                        <p className="text-sm text-gray-400">Payment</p>
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase mt-1 ${order.paymentMethod === 'razorpay' ? 'bg-blue-900 text-blue-200' : 'bg-green-900 text-green-200'}`}>
                                            {order.paymentMethod}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-400">Total</p>
                                        <p className="text-xl font-bold text-red-500">₹{order.total}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
