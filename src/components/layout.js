import React from 'react';
import { Link } from 'gatsby';

export default ({ children }) => (
  <div style={{ padding: '1em' }}>
    <nav style={{ marginBottom: '1em' }}>
      <Link to="/">Spiritual Quotes</Link>
      {' \u2022 '}
      <Link to="/quotes/">All Quotes</Link>
      {' \u2022 '}
      <Link to="/categories/">Quote Categories</Link>
    </nav>
    <hr />
    <div>
      {children}
    </div>
  </div>
);
