// Import React to create the component
import React from 'react';

// Import Link for navigation and useLocation to get current URL
import { Link, useLocation } from 'react-router-dom';

// Functional Component for 404 Error Page
export default function NotFound() {

  // useLocation gives access to the current URL path
  const loc = useLocation();

  return (
    // Main wrapper for the 404 page layout
    <div className="container center">
      
      {/* Heading for 404 Not Found error */}
      <h2>404 — Page Not Found</h2>
      
      {/* Displaying which URL path was not found */}
      <p>
        The requested URL <strong>{loc.pathname}</strong> was not found.
      </p>

      {/* Button-style link that redirects the user back to the home page */}
      <Link to="/" className="link-btn">
        Back to Home
      </Link>
    </div>
  );
}
