const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('./models/Product');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/redolic';

const seedProducts = [
    {
        name: "The Aura | oversized unisex T-shirt",
        description: "Premium oversized unisex t-shirt with Aura design. High-quality cotton, comfortable fit.",
        price: 799,
        originalPrice: 1399,
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["p1f.jpeg", "p1b.jpeg"]
    },
    {
        name: "Red Dragon | Oversized Unisex T-shirt",
        description: "Stylish Red Dragon print oversized t-shirt. Bold design for a bold look.",
        price: 699,
        originalPrice: 1399,
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["p2f.jpeg", "p2b.jpeg"]
    }
];

const sourceDir = path.join(__dirname, '../frontend/public');
const destDir = path.join(__dirname, 'uploads');

const copyImages = (images) => {
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    return images.map(imgName => {
        const sourcePath = path.join(sourceDir, imgName);
        const destName = `seed-${Date.now()}-${imgName}`; // Unique name
        const destPath = path.join(destDir, destName);

        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`Copied ${imgName} to ${destName}`);
            return `/uploads/${destName}`;
        } else {
            console.warn(`Warning: Source image ${imgName} not found at ${sourcePath}`);
            return null;
        }
    }).filter(path => path !== null);
};

const seed = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        for (const p of seedProducts) {
            // Check if product already exists to avoid duplicates
            const existing = await Product.findOne({ name: p.name });
            if (existing) {
                console.log(`Product "${p.name}" already exists. Skipping.`);
                continue;
            }

            const imagePaths = copyImages(p.images);

            const newProduct = new Product({
                ...p,
                images: imagePaths
            });

            await newProduct.save();
            console.log(`Added product: ${p.name}`);
        }

        console.log('Seeding completed.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seed();
