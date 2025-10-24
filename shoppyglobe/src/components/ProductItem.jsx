// Import React to create the component
import React from 'react';

// Link is used for navigation without page reloads
import { Link } from 'react-router-dom';

// useDispatch allows us to send actions to Redux
import { useDispatch } from 'react-redux';

// Redux action to add a product to the cart
import { addToCart } from '../redux/cartSlice';

// ProductItem component receives "product" as a prop
export default function ProductItem({ product }) {

  // Get dispatch function from Redux to trigger actions
  const dispatch = useDispatch();

  return (
    <article className="product-card">
      {/* Clicking the image takes user to that product's detail page */}
      <Link to={`/product/${product.id}`} className="product-img-wrap">
        {/* "loading='lazy'" loads images only when needed -> improves performance */}
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          loading="lazy" 
        />
      </Link>

      <div className="product-body">
        {/* Product Name/Title */}
        <h3 className="product-title">{product.title}</h3>

        {/* Shortened description (first 80 characters) */}
        <p className="product-desc">
          {product.description?.slice(0, 80)}...
        </p>

        {/* Product Price & Rating Section */}
        <div className="product-meta">
          {/* Price formatted to 2 decimal places */}
          <div className="price">
            ${product.price.toFixed(2)}
          </div>

          {/* Product Rating shown with a star icon */}
          <div className="rating">
            ⭐ {product.rating}
          </div>
        </div>

        {/* Action Buttons: Add to Cart & View Details */}
        <div className="product-actions">
          {/* Add product to cart when clicked */}
          <button 
            className="btn" 
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>

          {/* Link to product detail page */}
          <Link 
            to={`/product/${product.id}`} 
            className="link-btn"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
