import React from 'react';

import Layout from '../components/layout';
import { Heading, Column } from '../components/content';

const COLUMN_CLASSNAME = 'col-sm mx-auto';

export default ({ location }) => (
  <Layout
    location={location}
    title="Spiritual Quotes Home"
    heading={
      <Column className={COLUMN_CLASSNAME}>
        <Heading>Spiritual Quotes Home</Heading>
      </Column>
    }
  >
    <Column className={COLUMN_CLASSNAME}>
      {/* TODO: Home page content */}
    </Column>
  </Layout>
);
