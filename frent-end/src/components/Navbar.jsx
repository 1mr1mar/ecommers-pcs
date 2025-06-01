import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            PC Parts Store
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-primary">
              Products
            </Link>
            <Link to="/products?category=prebuilt" className="text-gray-600 hover:text-primary">
              Pre-built PCs
            </Link>
            <Link to="/products?category=components" className="text-gray-600 hover:text-primary">
              Components
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-600 hover:text-primary">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-primary">
              <UserIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 