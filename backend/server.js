const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Order = require('./models/Order');
const Product = require('./models/Product');
const app = express();
// Robustly load .env from the backend directory regardless of CWD
const envPath = path.join(__dirname, '.env');
const result = require('dotenv').config({ path: envPath });

if (result.error) {
  console.warn(`Warning: .env file not found at ${envPath}`);
} else {
  console.log(`Loaded .env from ${envPath}`);
}

const PORT = process.env.PORT || 5000;
console.log(`Configured PORT: ${PORT}`);


// Middleware
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:5173', 'https://redolic.in'];
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }

    // Check for local network IPs (typically 192.168.x.x or 10.x.x.x or 172.16.x.x) on port 5173
    // This allows mobile testing where origin is http://<Network-IP>:5173
    if (origin.startsWith('http://') && (
      origin.includes('192.168.') ||
      origin.includes('10.') ||
      origin.includes('172.')
    ) && origin.split(':').pop() === '5173') {
      return callback(null, true);
    }

    // Default: Block but log for debugging opacity
    console.log('Blocked by CORS:', origin);
    callback(null, false);
  },
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Configuration for Image Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('Email transporter is ready to send messages');
  }
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@redolic.in' && password === 'redolic@shahin') {
    const token = jwt.sign({ role: 'admin' }, 'secret_key_change_this_in_production', { expiresIn: '1d' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Product Routes

// Create Product
app.post('/api/products', upload.array('images', 5), async (req, res) => {
  try {
    const { name, description, price, originalPrice, sizes } = req.body;
    let imagePaths = [];
    if (req.files) {
      imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    }

    // Sizes might come as a stringified JSON if sent via FormData
    let parsedSizes = sizes;
    if (typeof sizes === 'string') {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch (e) {
        parsedSizes = sizes.split(',').map(s => s.trim());
      }
    }

    const product = new Product({
      name,
      description,
      price,
      originalPrice,
      sizes: parsedSizes,
      images: imagePaths,
    });

    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Failed to create product' });
  }
});

// Update Product
app.put('/api/products/:id', upload.array('images', 5), async (req, res) => {
  try {
    const { name, description, price, originalPrice, sizes, existingImages } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.originalPrice = originalPrice;

    // Handle sizes
    let parsedSizes = sizes;
    if (typeof sizes === 'string') {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch (e) {
        parsedSizes = sizes.split(',').map(s => s.trim());
      }
    }
    product.sizes = parsedSizes;

    // Handle Images
    // existingImages might come as array or string (if single) or undefined
    let currentImages = [];
    if (existingImages) {
      if (Array.isArray(existingImages)) {
        currentImages = existingImages;
      } else {
        currentImages = [existingImages];
      }
    }

    let newImagePaths = [];
    if (req.files) {
      newImagePaths = req.files.map(file => `/uploads/${file.filename}`);
    }

    // Combine existing kept images with new uploads
    product.images = [...currentImages, ...newImagePaths];

    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Failed to update product' });
  }
});

// Get All Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    // Normalize image paths if necessary (add full URL if needed by frontend, but relative is usually okay if base URL is set)
    // For now returning relative paths as stored. Frontend should prepend backend URL
    const productsWithFullParams = products.map(p => ({
      ...p._doc,
      id: p._id // Frontend commonly expects 'id'
    }));
    res.json(productsWithFullParams);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

// Get Single Product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ ...product._doc, id: product._id });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
});

// Delete Product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      // Optional: Delete images from filesystem
      product.images.forEach(img => {
        const filePath = path.join(__dirname, img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    }
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
});

// Get Orders (For Admin Dashboard)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 }); // Assuming Order model has date or createdAt
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});


// Create order endpoint (Razorpay)
app.post('/api/create-order', async (req, res) => {
  console.log('Create order request received:', req.body);
  try {
    const { amount, currency = 'INR' } = req.body;

    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      id: order.id,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create razorpay order',
    });
  }
});

// Save order endpoint
app.post('/api/save-order', async (req, res) => {
  try {
    const { items, total, paymentMethod, paymentId, userEmail, shippingInfo } = req.body;

    const order = new Order({
      items,
      total,
      paymentMethod,
      paymentId,
      status: paymentMethod === 'cod' ? 'pending' : 'paid',
      userEmail,
      shippingInfo, // Saving shipping info
    });

    await order.save();

    // Send email notification to admin
    const orderDetails = items.map(item =>
      `${item.name} (Size: ${item.size}, Qty: ${item.quantity}) - ₹${item.price * item.quantity}`
    ).join('\n');

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'admin@redolic.in', // Forced as per requirement, or process.env.ADMIN_EMAIL
      subject: `New Order Received - Order ID: ${order._id}`,
      text: `
New Order Details:

Order ID: ${order._id}
Payment Method: ${paymentMethod}
Payment ID: ${paymentId || 'N/A'}
Total Amount: ₹${total}
Status: ${order.status}
Customer Email: ${userEmail || 'Not provided'}

Shipping Information:
Name: ${shippingInfo?.firstName} ${shippingInfo?.lastName}
Address: ${shippingInfo?.address}
City: ${shippingInfo?.city}
Pincode: ${shippingInfo?.pincode}
Phone: ${shippingInfo?.phone}

Items:
${orderDetails}

Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      `,
    };

    transporter.sendMail(adminMailOptions, (error, info) => {
      if (error) console.error('Admin Email Error:', error);
      else console.log('Admin Email sent:', info.response);
    });

    // Send email to Customer
    if (userEmail) {
      const customerMailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: `Order Confirmation - Redolic - Order ID: ${order._id}`,
        text: `
Thank you for your order!

Order ID: ${order._id}
Total Amount: ₹${total}

Items:
${orderDetails}

We will notify you when your order is shipped.
            `,
      };
      transporter.sendMail(customerMailOptions, (error, info) => {
        if (error) console.error('Customer Email Error:', error);
        else console.log('Customer Email sent:', info.response);
      });
    }

    res.json({
      success: true,
      message: 'Order saved successfully',
      orderId: order._id,
    });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save order',
    });
  }
});

// Verify payment endpoint
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
      res.json({
        success: true,
        message: 'Payment verified successfully',
        payment_id: razorpay_payment_id,
      });
    } else {
      res.json({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
    });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});