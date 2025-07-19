import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart, Heart, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }
    
    try {
      await addToCart(product.id);
      alert('Item added to cart!');
    } catch (error) {
      alert('Error adding item to cart');
    }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to add items to wishlist');
      return;
    }
    
    try {
      await addToWishlist(product.id);
      alert('Item added to wishlist!');
    } catch (error) {
      alert('Error adding item to wishlist');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2">
            <button
              onClick={handleAddToWishlist}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <Heart size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center mt-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">(4.5)</span>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-primary-600">
            ₹{product.price}
          </span>
          
          <button
            onClick={handleAddToCart}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </button>
        </div>
        
        <div className="mt-2">
          <span className="text-sm text-gray-500">
            Stock: {product.stock_quantity} available
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;