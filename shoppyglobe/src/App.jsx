import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Loader from './utils/Loader';

// Lazy load pages/components to enable code splitting
const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const NotFound = lazy(() => import('./components/NotFound'));

export default function App() {
  return (
    <>
      {/* Header is displayed on all pages */}
      <Header />

      {/* Suspense handles fallback UI while lazy-loaded components are being fetched */}
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home />} />

          {/* Product detail page (dynamic ID from URL) */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Cart page */}
          <Route path="/cart" element={<CartPage />} />

          {/* Checkout page */}
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* 404 Not Found page for unmatched routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

