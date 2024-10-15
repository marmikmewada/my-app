const mongoose = require('mongoose');

// User Model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    selectedMode: { type: String },
    newsletter: { type: Boolean, default: false },
    couponUsage: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DiscountCoupon' }],
    role: { type: String, enum: ['admin', 'user', 'staff'], default: 'user' },
}, { timestamps: true });

// Product Model
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdAt: { type: Date, default: Date.now },
});

// Category Model
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

// Store Model
const storeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    staff: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// Package Model
const packageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    minutes: { type: Number, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

// Discount Coupon Model
const discountCouponSchema = new mongoose.Schema({
    couponCode: { type: String, required: true, unique: true },
    percentage: { type: Number, required: true },
    maxUsage: { type: Number, required: true },
    expiry: { type: Date, required: true },
});

// Order Model
const orderSchema = new mongoose.Schema({
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    packageRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
    totalAmount: { type: Number, required: true },
    status: { type: String, required: true }, // e.g., 'pending', 'completed', etc.
    detailsFromStripe: { type: Object },
    paymentMethod: { type: String }, // e.g., 'credit_card', 'paypal', etc.
}, { timestamps: true });

// Newsletter Model
const newsletterSchema = new mongoose.Schema({
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subscribedAt: { type: Date, default: Date.now },
    email: { type: String, required: true },
    phone: { type: String },
});

// Cart Model
const cartSchema = new mongoose.Schema({
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    packageRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
    cartTotal: { type: Number, required: true },
});

// Booking Model
const bookingSchema = new mongoose.Schema({
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    storeRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true }, // e.g., '10:00 AM - 10:15 AM'
    packageRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
});

// Unavailable Slots Model
const unavailableSlotSchema = new mongoose.Schema({
    storeRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    date: { type: Date, required: true },
    startTime: { type: String, required: true }, // e.g., '10:00 AM'
    endTime: { type: String, required: true }, // e.g., '11:00 AM'
    reason: { type: String },
});

// Unavailable Days Model
const unavailableDaySchema = new mongoose.Schema({
    storeRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    date: { type: Date, required: true },
    reason: { type: String },
});

// Models Export
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);
const Store = mongoose.model('Store', storeSchema);
const Package = mongoose.model('Package', packageSchema);
const DiscountCoupon = mongoose.model('DiscountCoupon', discountCouponSchema);
const Order = mongoose.model('Order', orderSchema);
const Newsletter = mongoose.model('Newsletter', newsletterSchema);
const Cart = mongoose.model('Cart', cartSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const UnavailableSlot = mongoose.model('UnavailableSlot', unavailableSlotSchema);
const UnavailableDay = mongoose.model('UnavailableDay', unavailableDaySchema);

module.exports = {
    User,
    Product,
    Category,
    Store,
    Package,
    DiscountCoupon,
    Order,
    Newsletter,
    Cart,
    Booking,
    UnavailableSlot,
    UnavailableDay,
};
