import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Configure, InstantSearch } from 'react-instantsearch-dom';

import Layout from '../components/layout';
import { Hits, SearchBox } from '../components/search';

const algoliaClient = algoliasearch(
  'X714S4E474',
  'f1d168915a01f8c803dafacc99686b08',
);

const searchClient = {
  search: requests => algoliaClient.search(requests.map(request =>
    // Prevent search if query string is empty.
    request.params.query && request.params.query.length
      ? request
      : undefined
  )),
};

export default () => (
  <Layout>
    <h1>Spiritual Quotes Home</h1>
    <p>Welcome to spiritual quotes!</p>
    <div>
      <InstantSearch indexName="quotes" searchClient={searchClient}>
        <Configure
          hitsPerPage={30}
          attributesToSnippet={['value:20']}
          snippetEllipsisText={'\u2026'}
          // Do not fetch additional attributes beyond snippeted ones.
          attributesToRetrieve={[]}
        />
        {/* TODO: Do not show hits if input empty */}
        <SearchBox />
        {/* <Hits hitComponent={Hit} /> */}
        <Hits />
      </InstantSearch>
    </div>
  </Layout>
);
