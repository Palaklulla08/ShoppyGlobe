import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, incrementQty, decrementQty, updateQuantity } from '../redux/cartSlice';

// CartItem component receives a single cart item as props
export default function CartItem({ item }){
  const dispatch = useDispatch(); // Used to dispatch actions to Redux store

  return (
    <div className="cart-item-card">
      {/* Product image */}
      <img 
        className="cart-item-img" 
        src={item.thumbnail} 
        alt={item.title} 
        loading="lazy"  // Optimizes image loading
      />

      {/* Product name and price */}
      <div className="cart-item-main">
        <h4>{item.title}</h4>
        {/* Display price with two decimal places */}
        <div className="cart-item-price">${item.price.toFixed(2)}</div>
      </div>

      {/* Quantity controls - decrease, manual input, and increase */}
      <div className="cart-item-controls">
        {/* Decrease quantity button */}
        <button 
          className="qty-btn" 
          onClick={() => dispatch(decrementQty(item.id))}
        >
          −
        </button>

        {/* Quantity input field (user can manually type) */}
        <input
          className="qty-input"
          type="number"
          min="1"  // Prevents user from entering negative or zero
          value={item.quantity}
          onChange={(e) => {
            const val = Number(e.target.value || 1);
            // Ensure value is at least 1 before dispatching update
            dispatch(updateQuantity({ id: item.id, quantity: val >= 1 ? val : 1 }));
          }}
        />

        {/* Increase quantity button */}
        <button 
          className="qty-btn" 
          onClick={() => dispatch(incrementQty(item.id))}
        >
          +
        </button>
      </div>

      {/* Display subtotal for this item (price * quantity) */}
      <div className="cart-item-subtotal">
        ${ (item.price * item.quantity).toFixed(2) }
      </div>

      {/* Delete button to remove item from cart */}
      <button 
        className="delete-btn" 
        title="Remove" 
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        🗑
      </button>
    </div>
  );
}
