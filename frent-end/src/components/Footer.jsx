import { Link } from 'react-router-dom';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  CreditCardIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'Pre-built PCs', href: '/products?category=prebuilt' },
      { name: 'Components', href: '/products?category=components' },
      { name: 'Accessories', href: '/products?category=accessories' },
      { name: 'New Arrivals', href: '/products?sort=newest' },
      { name: 'Deals', href: '/products?sort=discount' },
      { name: 'Gift Cards', href: '/gift-cards' },
      { name: 'Custom Builds', href: '/custom-builds' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Shipping', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Warranty', href: '/warranty' },
      { name: 'Technical Support', href: '/support' },
      { name: 'Order Status', href: '/order-status' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Press', href: '/press' },
      { name: 'Partners', href: '/partners' },
      { name: 'Store Locator', href: '/stores' },
      { name: 'Reviews', href: '/reviews' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
      { name: 'Sitemap', href: '/sitemap' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'Instagram', icon: '📸', href: '#' },
    { name: 'YouTube', icon: '🎥', href: '#' },
  ];

  const paymentMethods = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'PayPal', icon: '💳' },
    { name: 'Apple Pay', icon: '💳' },
    { name: 'Google Pay', icon: '💳' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 w-full">
      {/* Top Section */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-2">
              <TruckIcon className="h-6 w-6 text-primary" />
              <span>Free Shipping on Orders Over $1000</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-6 w-6 text-primary" />
              <span>2-Year Warranty on All Products</span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCardIcon className="h-6 w-6 text-primary" />
              <span>Secure Payment Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <ArrowTopRightOnSquareIcon className="h-6 w-6 text-primary" />
              <span>Easy Returns & Exchanges</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold text-white mb-4 block">
              PC Parts Store
            </Link>
            <p className="mb-4">
              Your one-stop shop for all PC components and accessories. We provide high-quality products
              and exceptional customer service.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2" />
                <span>+212 696517130</span>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                <span>marwanganbour9@gmail.com</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2" />
                <span>123 Tech Street, Silicon Valley, CA 94043</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-white font-semibold mb-4">We Accept</h3>
          <div className="flex flex-wrap gap-4">
            {paymentMethods.map((method) => (
              <div key={method.name} className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded">
                <span>{method.icon}</span>
                <span>{method.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                © {currentYear} PC Parts Store. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{link.name}</span>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-400 text-center">
            <p>
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
              <Link to="/privacy" className="text-white hover:underline ml-1">
                Learn more
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 