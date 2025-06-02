import { Link } from 'react-router-dom';
import { 
  StarIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  ChatBubbleLeftRightIcon, 
  ArrowRightIcon,
  ClockIcon,
  FireIcon,
  TagIcon,
  ArrowPathIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState({
    featured: true,
    newArrivals: true
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    fetchFeaturedProducts();
    fetchNewArrivals();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products?featured=true&limit=4');
      const data = await response.json();
      setFeaturedProducts(data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      toast.error('Failed to load featured products');
    } finally {
      setLoading(prev => ({ ...prev, featured: false }));
    }
  };

  const fetchNewArrivals = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products?sort=newest&limit=4');
      const data = await response.json();
      setNewArrivals(data);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      toast.error('Failed to load new arrivals');
    } finally {
      setLoading(prev => ({ ...prev, newArrivals: false }));
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error('Please enter your email address');
      return;
    }
    // Here you would typically send the email to your backend
    toast.success('Thank you for subscribing to our newsletter!');
    setNewsletterEmail('');
  };

  const featuredCategories = [
    {
      id: 1,
      name: 'Pre-built PCs',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Ready-to-use gaming and workstation PCs',
      link: '/products?category=prebuilt'
    },
    {
      id: 2,
      name: 'Components',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'High-performance PC components',
      link: '/products?category=components'
    },
    {
      id: 3,
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Essential PC accessories and peripherals',
      link: '/products?category=accessories'
    },
  ];

  const features = [
    {
      icon: <TruckIcon className="h-8 w-8" />,
      title: 'Fast Shipping',
      description: 'Free shipping on orders over $1000',
      color: 'text-blue-500'
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: 'Warranty',
      description: '2-year warranty on all products',
      color: 'text-green-500'
    },
    {
      icon: <ChatBubbleLeftRightIcon className="h-8 w-8" />,
      title: '24/7 Support',
      description: 'Expert technical support',
      color: 'text-purple-500'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Gaming Enthusiast',
      content: 'The pre-built PC I purchased exceeded my expectations. Amazing performance and great customer service!',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Professional Designer',
      content: 'Building my workstation was easy with the high-quality components. The support team was very helpful.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Tech Professional',
      content: 'Best place to buy PC components. Competitive prices and fast shipping.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/2.jpg'
    }
  ];

  const deals = [
    {
      id: 1,
      title: 'Gaming PC Bundle',
      originalPrice: 2499.99,
      discountedPrice: 1999.99,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      endDate: '2024-03-31'
    },
    {
      id: 2,
      title: 'Monitor & Keyboard Combo',
      originalPrice: 499.99,
      discountedPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      endDate: '2024-03-31'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Build Your Dream PC with Premium Components
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              Discover our curated selection of high-performance PC components and pre-built systems. 
              From gaming rigs to professional workstations, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/products" 
                className="btn-primary bg-white text-primary hover:bg-gray-100 flex items-center justify-center gap-2"
              >
                Shop Now
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link 
                to="/products?category=prebuilt" 
                className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-primary"
              >
                View Pre-built PCs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-gray-600">Handpicked products for you</p>
          </div>
          <Link to="/products" className="text-primary hover:text-primary-dark flex items-center gap-2">
            View All
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
        {loading.featured ? (
          <div className="flex justify-center items-center h-64">
            <ArrowPathIcon className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">4.8</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <SparklesIcon className="h-8 w-8 text-primary" />
            <div>
              <h2 className="text-3xl font-bold">New Arrivals</h2>
              <p className="text-gray-600">Latest products just in</p>
            </div>
          </div>
          <Link to="/products?sort=newest" className="text-primary hover:text-primary-dark flex items-center gap-2">
            View All
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
        {loading.newArrivals ? (
          <div className="flex justify-center items-center h-64">
            <ArrowPathIcon className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    New
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">4.8</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Added {new Date(product.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of PC components and accessories. Find everything you need to build or upgrade your system.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-gray-200">{category.description}</p>
                    <div className="mt-4 flex items-center text-white group-hover:translate-x-2 transition-transform duration-300">
                      <span className="font-medium">Explore</span>
                      <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Deals Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Special Deals</h2>
              <p className="text-gray-600">Limited time offers</p>
            </div>
            <Link to="/products?sort=discount" className="text-primary hover:text-primary-dark flex items-center gap-2">
              View All Deals
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {deals.map((deal) => (
              <div key={deal.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
                    <FireIcon className="h-4 w-4" />
                    <span>Hot Deal</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl font-bold text-primary">${deal.discountedPrice}</span>
                    <span className="text-gray-500 line-through">${deal.originalPrice}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {Math.round((1 - deal.discountedPrice / deal.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    <span>Ends {new Date(deal.endDate).toLocaleDateString()}</span>
                  </div>
                  <Link
                    to={`/products?deal=${deal.id}`}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <TagIcon className="h-5 w-5" />
                    Get Deal
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience for PC enthusiasts and professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest products, deals, and tech news.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="btn-secondary bg-white text-primary hover:bg-gray-100"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;