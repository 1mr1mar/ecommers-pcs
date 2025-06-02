import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon, ArrowLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://tortoiseshell-funny-forsythia.glitch.me/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart(product, quantity);
    toast.success('Added to cart!');
    setQuantity(1);
  };

  const handleWishlist = () => {
    setIsWishlist(!isWishlist);
    // Wishlist functionality will be implemented later
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
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 btn-primary"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 btn-primary"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-primary mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
            <button
              onClick={handleWishlist}
              className={`absolute top-4 right-4 p-2 rounded-full ${
                isWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
              } hover:bg-red-500 hover:text-white transition-colors duration-300`}
            >
              <HeartIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                {product.category}
              </span>
            </div>
            <div className="flex items-center mt-2">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <span className="ml-1 text-gray-600">{product.rating} Rating</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-primary">
            ${product.price}
          </div>

          <p className="text-gray-600">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <label htmlFor="quantity" className="text-gray-700">Quantity:</label>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-1 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => Math.min(5, prev + 1))}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                disabled={quantity >= 5}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>

          {/* Product Details */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-bold mb-4">Product Details</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Category</span>
                <span className="font-medium capitalize">{product.category}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Rating</span>
                <span className="font-medium">{product.rating} / 5.0</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Price</span>
                <span className="font-medium">${product.price}</span>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span>Free shipping on orders over $1000</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span>Estimated delivery: 2-4 business days</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 