// Importing React to use JSX and build functional components
import React from 'react';

// Import Link for navigation without reloading the page
// useLocation to detect the current route path
import { Link, useLocation } from 'react-router-dom';

// useSelector to read data from Redux store
// useDispatch to send actions to Redux store
import { useSelector, useDispatch } from 'react-redux';

// Action to update search term in Redux store
import { setSearchTerm } from '../redux/productSlice';

// Logo Component: A small, reusable component for branding/logo
const Logo = () => (
  <div className="logo">
    {/* Shoppy (purple) + Globe (orange) = Brand Name */}
    <span className="logo-purple">Shoppy</span>
    <span className="logo-orange">Globe</span>
  </div>
);

export default function Header() {

  // Accessing total items in cart from Redux state
  // items.reduce() is used to calculate total quantity of all cart items
  const cartCount = useSelector(state =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  // Accessing current search input value from Redux store
  const searchTerm = useSelector(state => state.products.searchTerm);

  // dispatch is used to send an action to Redux to update the state
  const dispatch = useDispatch();

  // useLocation returns current URL path (helps highlight active nav link)
  const loc = useLocation();

  return (
    <header className="site-header">
      <div className="header-inner">

        {/* Logo - Clicking it navigates to homepage ('/') */}
        <Link to="/" className="left-group">
          <Logo />
        </Link>

        {/* Search Bar Section */}
        <div className="search-wrap">
          <input
            className="search-input"
            placeholder="Search products..."  // Placeholder text
            value={searchTerm}              // Controlled input (Redux value)
            // When user types, update the Redux search term value
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
        </div>

        {/* Right side navigation (Home + Cart) */}
        <nav className="header-right">

          {/* Home Link - adds 'active' class if current route is '/' */}
          <Link
            to="/"
            className={`nav-link ${loc.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>

          {/* Cart Link - Displays icon + cart item count */}
          <Link to="/cart" className="cart-link">
            {/* Shopping Cart Icon (SVG format) */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              {/* Cart shape (handle, wheels, body) */}
              <path
                d="M3 3h2l.4 2M7 13h10l3-8H6.4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Two circles = wheels of the cart */}
              <circle cx="10" cy="21" r="1" />
              <circle cx="18" cy="21" r="1" />
            </svg>

            {/* Badge showing total number of items in cart */}
            <span className="cart-badge">{cartCount}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
