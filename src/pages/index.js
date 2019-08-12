import React from 'react';

import Layout from '../components/layout';

export default ({ location }) => (
  <Layout location={location} title="Spiritual Quotes Home">
    <div className="container">
      <div className="row">
        <div className="col-sm mx-auto">
          <h1 className="mb-3">Spiritual Quotes Home</h1>
          <p>Welcome to spiritual quotes!</p>
        </div>
      </div>
    </div>
  </Layout>
);
