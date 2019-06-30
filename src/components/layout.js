import React from 'react';
import { Link } from 'gatsby';

export default ({ location, children }) => (
  <div>
    <nav className="nav nav-tabs">
      <Link to="/" className="nav-link" activeClassName="active">
        Spiritual Quotes
      </Link>
      <Link to="/quotes/" className="nav-link" activeClassName="active">
        All Quotes
      </Link>
      <Link to="/categories/" className="nav-link" activeClassName="active">
        Quote Categories
      </Link>
      <Link to="/authors/rama/" className="nav-link" activeClassName="active">
        About Rama
      </Link>
    </nav>
    <div className="p-3">
      {children}
    </div>
  </div>
);
