import React from 'react';
import { Link } from 'gatsby';

export default ({ children }) => (
  <div>
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <Link to="/" className="navbar-brand" activeClassName="active">
        Spiritual Quotes
      </Link>
      <button
        type="button"
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav">
          <Link to="/all-quotes/" className="nav-item nav-link" activeClassName="active">
            All Quotes
          </Link>
          <Link to="/categories/" className="nav-item nav-link" activeClassName="active">
            Quote Categories
          </Link>
          <Link to="/authors/rama/" className="nav-item nav-link" activeClassName="active">
            About Rama
          </Link>
        </div>
      </div>
    </nav>
    <div className="p-3">
      {children}
    </div>
  </div>
);
