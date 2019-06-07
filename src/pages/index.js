import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';

export default () => (
    <Layout>
        <p>Welcome to spiritual quotes!</p>
        <Link to="/quotes/">See all quotes</Link>
    </Layout>
);
