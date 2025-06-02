import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  StarIcon, 
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  FunnelIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import {
  MotionDiv,
  MotionButton,
  MotionImg,
  MotionSection,
  MotionH1,
  MotionH3,
  MotionP,
  pageTransition,
  staggerContainer,
  fadeInUp,
  cardHover,
  imageHover,
  listItem,
  dropdownAnimation,
  accordionAnimation
} from '../utils/animations';

const Products = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    price: true,
    rating: true
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = category 
          ? `https://tortoiseshell-funny-forsythia.glitch.me/api/products?category=${category}`
          : 'https://tortoiseshell-funny-forsythia.glitch.me/api/products';
        const response = await axios.get(url);
        setProducts(response.data);
        
        // Extract unique categories from products
        const categories = [...new Set(response.data.map(product => product.category))];
        setAvailableCategories(categories);
        
        // If category is in URL, add it to selected categories
        if (category) {
          setSelectedCategories([category]);
        }
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleSort = (value) => {
    setSortBy(value);
    const sortedProducts = [...products];
    switch (value) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'name-asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const toggleFilterSection = (section) => {
    setExpandedFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 5000 });
    setSortBy('');
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    return matchesCategory && matchesPrice;
  });

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <MotionDiv
      className="space-y-6"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {/* Mobile Filter Button */}
      <MotionButton
        className="lg:hidden flex items-center gap-2 btn-primary"
        onClick={() => setShowFilters(!showFilters)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FunnelIcon className="h-5 w-5" />
        Filters
      </MotionButton>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <MotionDiv
          className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}
          variants={fadeInUp}
        >
          <MotionDiv
            className="bg-white rounded-lg shadow-md p-4"
            variants={staggerContainer}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <MotionButton
                onClick={clearFilters}
                className="text-sm text-primary hover:text-primary-dark"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Clear All
              </MotionButton>
            </div>

            {/* Categories Filter */}
            <MotionDiv
              className="border-b border-gray-200 pb-4"
              variants={accordionAnimation}
            >
              <MotionButton
                className="flex justify-between items-center w-full mb-2"
                onClick={() => toggleFilterSection('categories')}
                whileHover={{ x: 5 }}
              >
                <span className="font-medium">Categories</span>
                {expandedFilters.categories ? (
                  <ChevronUpIcon className="h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )}
              </MotionButton>
              {expandedFilters.categories && (
                <MotionDiv
                  className="space-y-2"
                  variants={staggerContainer}
                >
                  {availableCategories.map((cat) => (
                    <MotionDiv
                      key={cat}
                      variants={listItem}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span className="text-sm">{cat}</span>
                    </MotionDiv>
                  ))}
                </MotionDiv>
              )}
            </MotionDiv>

            {/* Price Range Filter */}
            <MotionDiv
              className="border-b border-gray-200 pb-4"
              variants={accordionAnimation}
            >
              <MotionButton
                className="flex justify-between items-center w-full mb-2"
                onClick={() => toggleFilterSection('price')}
                whileHover={{ x: 5 }}
              >
                <span className="font-medium">Price Range</span>
                {expandedFilters.price ? (
                  <ChevronUpIcon className="h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )}
              </MotionButton>
              {expandedFilters.price && (
                <MotionDiv
                  className="space-y-4"
                  variants={staggerContainer}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                      className="w-full input-field"
                      placeholder="Min"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                      className="w-full input-field"
                      placeholder="Max"
                    />
                  </div>
                </MotionDiv>
              )}
            </MotionDiv>

            {/* Rating Filter */}
            <MotionDiv variants={accordionAnimation}>
              <MotionButton
                className="flex justify-between items-center w-full mb-2"
                onClick={() => toggleFilterSection('rating')}
                whileHover={{ x: 5 }}
              >
                <span className="font-medium">Rating</span>
                {expandedFilters.rating ? (
                  <ChevronUpIcon className="h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )}
              </MotionButton>
              {expandedFilters.rating && (
                <MotionDiv
                  className="space-y-2"
                  variants={staggerContainer}
                >
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <MotionDiv
                      key={rating}
                      variants={listItem}
                      className="flex items-center gap-2 text-sm hover:text-primary"
                    >
                      {[...Array(rating)].map((_, i) => (
                        <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <span>& Up</span>
                    </MotionDiv>
                  ))}
                </MotionDiv>
              )}
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>

        {/* Products Grid */}
        <MotionDiv
          className="flex-1"
          variants={staggerContainer}
        >
          <div className="flex justify-between items-center mb-6">
            <MotionH1
              className="text-2xl font-bold"
              variants={fadeInUp}
            >
              {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
            </MotionH1>
            <MotionDiv
              className="flex space-x-4"
              variants={fadeInUp}
            >
              <select 
                className="input-field max-w-xs"
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </MotionDiv>
          </div>

          <MotionDiv
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {filteredProducts.map((product) => (
              <MotionDiv
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                variants={fadeInUp}
                whileHover={cardHover}
                onClick={() => handleProductClick(product._id)}
              >
                <div className="relative overflow-hidden">
                  <MotionImg
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    whileHover={imageHover}
                  />
                  <MotionDiv
                    className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {product.category}
                  </MotionDiv>
                </div>
                <div className="p-4">
                  <MotionH3
                    className="font-bold text-lg mb-2 hover:text-primary transition-colors duration-300"
                    variants={fadeInUp}
                  >
                    {product.name}
                  </MotionH3>
                  <MotionP
                    className="text-gray-600 text-sm mb-2 line-clamp-2"
                    variants={fadeInUp}
                  >
                    {product.description}
                  </MotionP>
                  <div className="flex items-center mb-2">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">${product.price}</span>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>

          {filteredProducts.length === 0 && (
            <MotionDiv
              className="text-center py-12"
              variants={fadeInUp}
            >
              <p className="text-gray-500">No products found matching your filters.</p>
              <MotionButton
                onClick={clearFilters}
                className="mt-4 text-primary hover:text-primary-dark"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Filters
              </MotionButton>
            </MotionDiv>
          )}
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};

export default Products; 