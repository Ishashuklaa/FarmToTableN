import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Menu, X, ShoppingCart, Heart, User, LogOut, Shield, Tractor } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin, isFarmer } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemsCount = getCartItemsCount();

  const getDashboardLink = () => {
    if (isAdmin) return '/admin';
    if (isFarmer) return '/farmer-dashboard';
    return '/dashboard';
  };

  const getRoleIcon = () => {
    if (isAdmin) return <Shield size={16} className="text-red-500" />;
    if (isFarmer) return <Tractor size={16} className="text-green-500" />;
    return <User size={16} className="text-blue-500" />;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <span className="text-white font-bold text-xl">F2T</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Farm to Table</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-primary-600 transition-colors">Shop</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">Contact</Link>

            {isAuthenticated ? (
              <>
                {!isFarmer && !isAdmin && (
                  <>
                    <Link to="/cart" className="relative text-gray-700 hover:text-primary-600 transition-colors">
                      <ShoppingCart size={24} />
                      {cartItemsCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {cartItemsCount}
                        </span>
                      )}
                    </Link>
                    <Link to="/wishlist" className="text-gray-700 hover:text-primary-600 transition-colors">
                      <Heart size={24} />
                    </Link>
                  </>
                )}

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    {getRoleIcon()}
                    <span>{user?.name}</span>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to={getDashboardLink()}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {isAdmin ? 'Admin Panel' : isFarmer ? 'Farmer Dashboard' : 'Dashboard'}
                      </Link>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut size={16} className="inline mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-primary-600">Home</Link>
              <Link to="/shop" className="block px-3 py-2 text-gray-700 hover:text-primary-600">Shop</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-primary-600">Contact</Link>

              {isAuthenticated ? (
                <>
                  {!isFarmer && !isAdmin && (
                    <>
                      <Link to="/cart" className="block px-3 py-2 text-gray-700 hover:text-primary-600">
                        Cart ({cartItemsCount})
                      </Link>
                      <Link to="/wishlist" className="block px-3 py-2 text-gray-700 hover:text-primary-600">
                        Wishlist
                      </Link>
                    </>
                  )}
                  <Link to={getDashboardLink()} className="block px-3 py-2 text-gray-700 hover:text-primary-600">
                    {isAdmin ? 'Admin Panel' : isFarmer ? 'Farmer Dashboard' : 'Dashboard'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-primary-600">Login</Link>
                  <Link to="/register" className="block px-3 py-2 text-gray-700 hover:text-primary-600">Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
