import React from 'react';

import Page from '../components/page';
import { Heading, Column } from '../components/content';

const COLUMN_CLASSNAME = 'col-sm mx-auto';

export default ({ location }) => (
  <Page
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
  </Page>
);
