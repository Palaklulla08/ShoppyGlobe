// Import React hooks
import { useEffect, useState } from 'react';

// Import axios for making HTTP requests
import axios from 'axios';

/**
 * Custom hook to fetch all products
 * @returns {object} { products, loading, error } - Product data, loading status, and any error
 */
export default function useFetchProducts() {
  // State to store the fetched products
  const [products, setProducts] = useState([]);

  // State to track whether the request is loading
  const [loading, setLoading] = useState(true);

  // State to store any error message
  const [error, setError] = useState(null);

  useEffect(() => {
    // Track if the component is still mounted to prevent memory leaks
    let mounted = true;

    // Set loading state to true before fetching
    setLoading(true);

    // Fetch products from the dummyjson API
    axios.get('https://dummyjson.com/products')
      .then(res => {
        if (mounted) {
          // Save products in state; default to empty array if undefined
          setProducts(res.data.products || []);
        }
      })
      .catch(err => {
        if (mounted) {
          // Save error message if fetch fails
          setError(err.message || 'Failed to load');
        }
      })
      .finally(() => {
        if (mounted) {
          // Stop loading once request is complete
          setLoading(false);
        }
      });

    // Cleanup function: mark as unmounted when component is removed
    return () => { mounted = false; };
  }, []); // Empty dependency array → run only once on mount

  // Return products data, loading state, and error state
  return { products, loading, error };
}
