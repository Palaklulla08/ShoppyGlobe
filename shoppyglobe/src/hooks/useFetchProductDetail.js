// Import React hooks
import { useEffect, useState } from 'react';

// Import axios for HTTP requests
import axios from 'axios';

/**
 * Custom hook to fetch product details by ID
 * @param {number|string} id - Product ID to fetch
 * @returns {object} { product, error } - Product data and error state
 */
export default function useFetchProductDetail(id) {
  // State to store the fetched product
  const [product, setProduct] = useState(null);

  // State to store any error that occurs during fetch
  const [error, setError] = useState(null);

  useEffect(() => {
    // If no ID is provided, do nothing
    if (!id) return;

    // Track if component is still mounted to prevent memory leaks
    let mounted = true;

    // Fetch product data from dummyjson API
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => {
        if (mounted) {
          // Save product data in state if component is still mounted
          setProduct(res.data);
        }
      })
      .catch(err => {
        if (mounted) {
          // Save error message if fetch fails
          setError(err.message || 'Failed to load');
        }
      });

    // Cleanup function: mark as unmounted when component is removed
    return () => { mounted = false; };
  }, [id]); // Re-run effect when product ID changes

  // Return the fetched product and any error
  return { product, error };
}
