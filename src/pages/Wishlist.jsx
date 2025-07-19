import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart, loading } = useCart();

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      await removeFromWishlist(itemId);
    } catch (error) {
      alert('Error removing item from wishlist');
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      alert('Item added to cart!');
    } catch (error) {
      alert('Error adding item to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Save your favorite products here!</p>
          <Link
            to="/shop"
            className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/product/${item.product_id}`}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              </Link>
              
              <div className="p-4">
                <Link to={`/product/${item.product_id}`}>
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-primary-600 transition-colors mb-2">
                    {item.name}
                  </h3>
                </Link>
                
                <p className="text-xl font-bold text-primary-600 mb-4">
                  ₹{item.price}
                </p>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(item.product_id)}
                    disabled={item.stock_quantity === 0}
                    className="flex-1 bg-primary-600 text-white py-2 px-3 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
                
                <div className="mt-2">
                  <span className="text-sm text-gray-500">
                    {item.stock_quantity > 0 ? `${item.stock_quantity} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;