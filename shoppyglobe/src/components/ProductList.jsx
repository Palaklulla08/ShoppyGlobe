// Import React to build the component
import React from 'react';

// useSelector -> get data from Redux store
// useDispatch -> send actions to Redux store
import { useSelector, useDispatch } from 'react-redux';

// Custom hook to fetch product data from API
import useFetchProducts from '../hooks/useFetchProducts';

// Reusable component that displays individual product cards
import ProductItem from './ProductItem';

// Redux action to store all products globally
import { setProducts } from '../redux/productSlice';

export default function ProductList() {
  // Fetch product data and related state (loading/error) from custom hook
  const { products, loading, error } = useFetchProducts();

  // To dispatch Redux actions
  const dispatch = useDispatch();

  // Retrieve current search value from Redux store (default: empty string)
  const searchTerm = useSelector(state => state.products.searchTerm || '');

  // When products are successfully fetched, store them in Redux
  React.useEffect(() => {
    if (products.length) dispatch(setProducts(products));
  }, [products, dispatch]);

  // Filter products by search term (case-insensitive search on title)
  const filtered = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show loading message while fetching items
  if (loading) return <div className="center">Loading products…</div>;

  // Show error message if fetching fails
  if (error) return <div className="center error">Error: {error}</div>;

  // Render product items once data is available and filtered
  return (
    <section className="product-list">
      {filtered.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </section>
  );
}
