// Import createSlice from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Create a slice for product-related state
const productSlice = createSlice({
  name: 'products', // Slice name
  initialState: { 
    list: [],       // Array to store all products fetched from API
    searchTerm: ''  // Current search term for filtering products
  },
  reducers: {
    // Set the list of products (e.g., after fetching from API)
    setProducts(state, action) {
      state.list = action.payload;
    },

    // Update the current search term (used for filtering product list)
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    }
  }
});

// Export actions so components can dispatch them
export const { setProducts, setSearchTerm } = productSlice.actions;

// Export the reducer to include in the Redux store
export default productSlice.reducer;
