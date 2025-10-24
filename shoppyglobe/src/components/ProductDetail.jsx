// Importing React library to use JSX and components
import React from 'react';

// useParams helps access route parameters (like /product/:id)
import { useParams } from 'react-router-dom';

// Custom hook to fetch product details from an API using the product ID
import useFetchProductDetail from '../hooks/useFetchProductDetail';

// useDispatch is used to send actions to the Redux store
import { useDispatch } from 'react-redux';

// Redux action to add a product to the cart
import { addToCart } from '../redux/cartSlice';

export default function ProductDetail() {
  // Extracting the "id" parameter from the URL
  // Example: if URL is /product/10 → id = "10"
  const { id } = useParams();

  // Using a custom hook to fetch product details by ID
  // This returns "product" data or an "error" if something goes wrong
  const { product, error } = useFetchProductDetail(id);

  // Create dispatch function to trigger Redux actions
  const dispatch = useDispatch();

  // If an error occurs during the fetch process, show an error message
  if (error) return <div className="center error">Error loading product</div>;

  // If data is not yet available (loading state), show a loading message
  if (!product) return <div className="center">Loading …</div>;

  // Once data is available, show the product details
  return (
    <main className="container product-detail-page">
      <div className="detail-card">
        
        {/* Product Image Section */}
        <img
          className="detail-image"
          src={product.thumbnail}      // Image URL from API
          alt={product.title}          // Accessible description
        />

        {/* Product Details Section */}
        <div className="detail-body">
          {/* Product Title */}
          <h2>{product.title}</h2>

          {/* Brand and Category of the product */}
          <p className="muted">
            {product.brand} • {product.category}
          </p>

          {/* Product Description Text */}
          <p className="desc">{product.description}</p>

          {/* Product Price formatted to two decimals */}
          <p className="price-large">
            ${product.price.toFixed(2)}
          </p>

          {/* Add to Cart Button */}
          <div className="detail-actions">
            <button
              className="btn"
              // When clicked, this adds the product to the cart using Redux
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
