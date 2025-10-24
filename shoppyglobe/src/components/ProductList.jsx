// // Import React to build the component
// import React from 'react';

// // useSelector -> get data from Redux store
// // useDispatch -> send actions to Redux store
// import { useSelector, useDispatch } from 'react-redux';

// // Custom hook to fetch product data from API
// import useFetchProducts from '../hooks/useFetchProducts';

// // Reusable component that displays individual product cards
// import ProductItem from './ProductItem';

// // Redux action to store all products globally
// import { setProducts } from '../redux/productSlice';

// export default function ProductList() {
//   // Fetch product data and related state (loading/error) from custom hook
//   const { products, loading, error } = useFetchProducts();

//   // To dispatch Redux actions
//   const dispatch = useDispatch();

//   // Retrieve current search value from Redux store (default: empty string)
//   const searchTerm = useSelector(state => state.products.searchTerm || '');

//   // When products are successfully fetched, store them in Redux
//   React.useEffect(() => {
//     if (products.length) dispatch(setProducts(products));
//   }, [products, dispatch]);

//   // Filter products by search term (case-insensitive search on title)
//   const filtered = products.filter(product =>
//     product.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Show loading message while fetching items
//   if (loading) return <div className="center">Loading products…</div>;

//   // Show error message if fetching fails
//   if (error) return <div className="center error">Error: {error}</div>;

//   // Render product items once data is available and filtered
//   return (
//     <section className="product-list">
//       {filtered.map(product => (
//         <ProductItem key={product.id} product={product} />
//       ))}
//     </section>
//   );
// }
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFetchProducts from '../hooks/useFetchProducts';
import ProductItem from './ProductItem';
import { setProducts } from '../redux/productSlice';

export default function ProductList() {
  const { products, loading, error } = useFetchProducts();
  const dispatch = useDispatch();
  const searchTerm = useSelector(s => s.products.searchTerm || '');

  // Store products in Redux when fetched
  React.useEffect(() => {
    if (products.length) dispatch(setProducts(products));
  }, [products, dispatch]);

  // Filter products by search term
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (loading) {
    return (
      <div className="center" style={{ padding: '20px' }}>
        Loading products…
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="center error" style={{ padding: '20px' }}>
        Error loading products: {error}
      </div>
    );
  }

  // Render products or "no results" message
  return (
    <section className="product-list">
      {filtered.length > 0 ? (
        filtered.map(p => <ProductItem key={p.id} product={p} />)
      ) : (
        <div className="center" style={{ padding: '20px', color: '#6b7280' }}>
          No products found for "{searchTerm}"
        </div>
      )}
    </section>
  );
}

