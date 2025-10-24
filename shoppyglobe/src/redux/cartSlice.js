// Import createSlice from Redux Toolkit to create a Redux slice
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the cart
// 'items' is an array of cart items, each item has:
// { id, title, price, thumbnail, quantity }
const initialState = {
  items: []
};

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',       // Slice name
  initialState,       // Initial state
  reducers: {
    // Add a product to the cart
    addToCart(state, action) {
      const p = action.payload; // Product object passed from component
      const existing = state.items.find(i => i.id === p.id); // Check if product already exists

      if (existing) {
        // If product exists, increment its quantity by 1
        existing.quantity += 1;
      } else {
        // Otherwise, add new product with quantity 1
        state.items.push({
          id: p.id,
          title: p.title,
          price: p.price,
          thumbnail: p.thumbnail,
          quantity: 1
        });
      }
    },

    // Remove a product from the cart by its ID
    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },

    // Increase quantity of a specific cart item by 1
    incrementQty(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
    },

    // Decrease quantity of a specific cart item by 1
    // Ensure quantity does not go below 1
    decrementQty(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    // Update quantity directly (e.g., from input field)
    // Only allow quantity >= 1
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item && quantity >= 1) item.quantity = quantity;
    },

    // Clear the entire cart
    clearCart(state) {
      state.items = [];
    }
  }
});

// Export the actions to be used in components
export const { 
  addToCart, 
  removeFromCart, 
  incrementQty, 
  decrementQty, 
  updateQuantity, 
  clearCart 
} = cartSlice.actions;

// Export the reducer to include in the Redux store
export default cartSlice.reducer;
