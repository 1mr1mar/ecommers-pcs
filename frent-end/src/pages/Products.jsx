import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockProducts = [
    {
      id: 1,
      name: 'Gaming PC Pro',
      category: 'prebuilt',
      price: 1299.99,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'High-performance gaming PC with RTX 3080',
    },
    {
      id: 2,
      name: 'Intel Core i9-13900K',
      category: 'components',
      price: 549.99,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Latest generation Intel processor',
    },
    {
      id: 3,
      name: 'RTX 4080 Graphics Card',
      category: 'components',
      price: 1199.99,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'NVIDIA RTX 4080 16GB GDDR6X',
    },
    {
      id: 4,
      name: 'Workstation PC',
      category: 'prebuilt',
      price: 1999.99,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Professional workstation for content creation',
    },
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const filteredProducts = category
        ? mockProducts.filter(product => product.category === category)
        : mockProducts;
      setProducts(filteredProducts);
      setLoading(false);
    }, 500);
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
        </h1>
        <div className="flex space-x-4">
          <select className="input-field max-w-xs">
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="flex items-center mb-2">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">${product.price}</span>
                <button className="btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products; 