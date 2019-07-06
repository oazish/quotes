import React from 'react';
import { Link } from 'gatsby';

export default ({ children }) => (
  <div>
    <nav className="navbar navbar-expand navbar-light bg-light">
      <Link to="/" className="navbar-brand nav-item nav-link" activeClassName="active">
        Spiritual Quotes
      </Link>
      <div className="navbar-nav">
        <Link to="/quotes/" className="nav-item nav-link" activeClassName="active">
          All Quotes
        </Link>
        <Link to="/categories/" className="nav-item nav-link" activeClassName="active">
          Quote Categories
        </Link>
        <Link to="/authors/rama/" className="nav-item nav-link" activeClassName="active">
          About Rama
        </Link>
      </div>
    </nav>
    <div className="p-3">
      {children}
    </div>
  </div>
);
