import { Link } from 'react-router-dom';

const Home = () => {
  const featuredCategories = [
    {
      id: 1,
      name: 'Pre-built PCs',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Ready-to-use gaming and workstation PCs',
    },
    {
      id: 2,
      name: 'Components',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'High-performance PC components',
    },
    {
      id: 3,
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Essential PC accessories and peripherals',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Build Your Dream PC</h1>
          <p className="text-lg mb-6">
            Find the perfect components for your next build or choose from our selection of pre-built gaming PCs.
          </p>
          <Link to="/products" className="btn-primary bg-white text-primary hover:bg-gray-100">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.name.toLowerCase().replace(' ', '-')}`}
              className="group"
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p>{category.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-primary text-4xl mb-4">🚚</div>
            <h3 className="font-bold mb-2">Fast Shipping</h3>
            <p>Free shipping on orders over $100</p>
          </div>
          <div className="text-center">
            <div className="text-primary text-4xl mb-4">🛡️</div>
            <h3 className="font-bold mb-2">Warranty</h3>
            <p>2-year warranty on all products</p>
          </div>
          <div className="text-center">
            <div className="text-primary text-4xl mb-4">💬</div>
            <h3 className="font-bold mb-2">24/7 Support</h3>
            <p>Expert technical support</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 