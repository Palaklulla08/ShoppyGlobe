
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

