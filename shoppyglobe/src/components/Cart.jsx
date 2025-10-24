import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  // Get all items in the cart from Redux store
  const items = useSelector(state => state.cart.items);

  // To redirect user programmatically (e.g., to checkout page)
  const navigate = useNavigate();

  // Calculate subtotal = sum of (price * quantity) for each item
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Add flat shipping cost only if there are items in the cart
  const shipping = items.length ? 10.0 : 0.0;

  // Total payment = subtotal + shipping
  const total = subtotal + shipping;

  return (
    <div className="container cart-page">
      <h1 className="page-title">Shopping Cart</h1>

      <div className="cart-grid">
        {/* Left Section – List of cart items or empty cart message */}
        <section className="cart-items-col">
          {items.length === 0 ? (
            // If cart is empty, show this message
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <Link to="/">Back to products</Link>
            </div>
          ) : (
            // Otherwise, render each cart item using CartItem component
            items.map(item => <CartItem key={item.id} item={item} />)
          )}
        </section>

        {/* Right Section – Order Summary card */}
        <aside className="cart-summary-col">
          <div className="summary-card">
            <h3>Order Summary</h3>

            {/* Subtotal price row */}
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {/* Shipping cost row */}
            <div className="summary-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <hr />

            {/* Final Total amount */}
            <div className="summary-total">
              <strong>Total</strong>
              <strong className="total-amount">${total.toFixed(2)}</strong>
            </div>

            {/* Button to navigate to Checkout page */}
            <button
              className="btn checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout →
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
