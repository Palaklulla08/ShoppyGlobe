import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  // Get cart items from Redux store
  const items = useSelector(state => state.cart.items);

  // Calculate subtotal, shipping, and total
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length ? 10.0 : 0.0; // Flat shipping if cart not empty
  const total = subtotal + shipping;

  const dispatch = useDispatch(); // For dispatching actions like clearing cart
  const navigate = useNavigate(); // For programmatic navigation

  // Form state to store user inputs
  const [form, setForm] = useState({ name: '', email: '', address: '' });

  // State to track if order has been placed
  const [placed, setPlaced] = useState(false);

  // Handle input changes for name, email, and address fields
  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Handle placing the order
  function placeOrder(e) {
    e.preventDefault();

    // Simple validation: check all fields are filled
    if (!form.name || !form.email || !form.address) {
      alert('Please fill all details.');
      return;
    }

    // Simulate order placement
    setPlaced(true);

    // Clear cart in Redux
    dispatch(clearCart());

    // Redirect to home after a short delay
    setTimeout(() => navigate('/'), 1400);
  }

  // If cart is empty and order not placed yet, show a friendly message
  if (items.length === 0 && !placed)
    return <div className="center">Your cart is empty.</div>;

  return (
    <div className="container checkout-container">

      {placed ? (
        // Show order confirmation message after placing order
        <div className="order-placed">
          <h2>Order placed</h2>
          <p>Thanks! Redirecting to Home…</p>
        </div>
      ) : (
        // Checkout form
        <form className="checkout-form" onSubmit={placeOrder}>

          {/* User Details Section */}
          <div>
            <h2>Checkout</h2>
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Address
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Order Review Section */}
          <div className="order-review">
            <h3>Order Summary</h3>

            {/* List all items with quantity and subtotal */}
            <ul>
              {items.map(item => (
                <li key={item.id}>
                  {item.title}  &times; {item.quantity} — $
                  {(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>

            {/* Subtotal and Shipping */}
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            {/* Total */}
            <div className="summary-total">
              <strong>Total</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>

            {/* Place Order Button */}
            <button className="btn checkout-btn" type="submit">
              Place Order
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
