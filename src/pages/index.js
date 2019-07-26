import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

import Layout from '../components/layout';

const searchClient = algoliasearch(
  'X714S4E474',
  'f1d168915a01f8c803dafacc99686b08',
);

export default () => (
  <Layout>
    <h1>Spiritual Quotes Home</h1>
    <p>Welcome to spiritual quotes!</p>
    <div>
      <InstantSearch
        indexName="quotes"
        searchClient={searchClient}
      >
      <SearchBox />
      <Hits />
    </InstantSearch>      
    </div>
  </Layout>
);
