const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    id: mongoose.Schema.Types.Mixed, // Allow both Number (legacy) and String (MongoDB ObjectId)
    name: String,
    price: Number,
    size: String,
    quantity: Number,
    image: String, // Store snapshot of item image
  }],
  total: Number,
  paymentMethod: String,
  paymentId: String,
  status: { type: String, default: 'pending' },
  userEmail: String, // Customer email
  shippingInfo: { // Added shipping info schema
    firstName: String,
    lastName: String,
    address: String,
    phone: String,
    city: String,
    pincode: String
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);