import React from 'react';
import ProductList from '../components/ProductList';

export default function Home() {
  return (
    <main className="container home-page">
      
      {/* Hero Section at the top of the homepage */}
      <section className="hero">
        <div className="hero-inner">
          {/* Main heading */}
          <h1>Welcome to ShoppyGlobe</h1>
          {/* Subtitle or tagline */}
          <p>Discover amazing products at great prices</p>
        </div>
      </section>

      {/* Section title for the product list */}
      <h2 className="section-title">Our Products</h2>

      {/* Render the list of products */}
      <ProductList />
    </main>
  );
}
