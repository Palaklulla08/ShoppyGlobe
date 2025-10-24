// Import configureStore from Redux Toolkit to create the store
import { configureStore } from '@reduxjs/toolkit';

// Import reducers for different slices
import cartReducer from './cartSlice';
import productReducer from './productSlice';

/**
 * Configure the Redux store
 * - Combines multiple reducers into one root reducer
 * - Provides a single store object to use in the app
 */
export default configureStore({
  reducer: {
    // Cart slice state will be available under "cart"
    cart: cartReducer,

    // Product slice state will be available under "products"
    products: productReducer,
  },
});
