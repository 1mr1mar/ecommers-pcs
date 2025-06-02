const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');

const sampleProducts = [
  // Prebuilt PCs
  {
    name: 'Ultimate Gaming Beast',
    category: 'prebuilt',
    price: 2499.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'High-end gaming PC with RTX 4090, Intel i9-13900K, 32GB DDR5, 2TB NVMe SSD, and liquid cooling'
  },
  {
    name: 'Streamer Pro PC',
    category: 'prebuilt',
    price: 1899.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Perfect for streaming and gaming with RTX 4070 Ti, AMD Ryzen 9 7900X, 32GB DDR5, and 1TB NVMe SSD'
  },
  {
    name: 'Budget Gaming PC',
    category: 'prebuilt',
    price: 999.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Entry-level gaming PC with RTX 4060, Intel i5-13600K, 16GB DDR4, and 1TB SSD'
  },
  // Components - CPUs
  {
    name: 'Intel Core i9-13900KS',
    category: 'components',
    price: 699.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Intel\'s flagship processor with 24 cores (8P+16E), up to 6.0GHz boost, and 36MB cache'
  },
  {
    name: 'AMD Ryzen 9 7950X',
    category: 'components',
    price: 649.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'AMD\'s top-tier processor with 16 cores, 32 threads, and 64MB L3 cache'
  },
  // Components - Graphics Cards
  {
    name: 'NVIDIA RTX 4090 Founders Edition',
    category: 'components',
    price: 1599.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'NVIDIA\'s flagship GPU with 24GB GDDR6X, DLSS 3.0, and ray tracing capabilities'
  },
  {
    name: 'AMD Radeon RX 7900 XTX',
    category: 'components',
    price: 999.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'AMD\'s high-end GPU with 24GB GDDR6, FSR 3.0, and excellent 4K performance'
  },
  // Components - Memory
  {
    name: 'Corsair Dominator Platinum RGB DDR5',
    category: 'components',
    price: 299.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: '32GB (2x16GB) DDR5-6000MHz with RGB lighting and aluminum heat spreader'
  },
  // Components - Storage
  {
    name: 'Samsung 990 Pro NVMe SSD',
    category: 'components',
    price: 199.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: '2TB PCIe 4.0 NVMe SSD with read speeds up to 7450MB/s and write speeds up to 6900MB/s'
  },
  // Components - Cooling
  {
    name: 'NZXT Kraken X73 RGB',
    category: 'components',
    price: 179.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: '360mm AIO liquid cooler with RGB fans, CAM software control, and 7th gen pump'
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      // Clear existing products
      await Product.deleteMany({});
      console.log('Cleared existing products');

      // Insert new products
      const insertedProducts = await Product.insertMany(sampleProducts);
      console.log('Added new products:', insertedProducts);
    } catch (error) {
      console.error('Error updating database:', error);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  }); 