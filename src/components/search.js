import React from 'react';
import { Link } from 'gatsby';
import debounce from 'lodash/debounce';
import algoliasearch from 'algoliasearch/lite';
import {
  Configure,
  Index,
  InstantSearch,
  Snippet,
  connectSearchBox,
  connectHits,
  connectStateResults,
} from 'react-instantsearch-dom';
import { IoMdSearch } from 'react-icons/io';
import classNames from 'classnames';
import $ from 'jquery';

import styles from '../styles/search.module.css';

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

export const SearchIcon = props => <IoMdSearch size="22px" {...props} />;

export const Search = () => {
  // The search components are heavy, and this code renders during build and
  // also in the browser, so exclude them from build-time rendering. Check for
  // `window` (defined only in the browser), exiting gracefully otherwise.
  if (typeof window === 'undefined') {
    return <></>;
  }

  return (
    <InstantSearch indexName="quotes" searchClient={searchClient}>
      <Configure
        hitsPerPage={25}
        attributesToSnippet={['value:20']}
        snippetEllipsisText={'\u2026'}
        // Do not fetch additional attributes beyond snippeted ones.
        attributesToRetrieve={[]}
        typoTolerance={false}
      />
      <SearchBox />
      <AllResults>
        <Index indexName="topics">
          <IndexResults name="Topics">
            <Hits />
          </IndexResults>
        </Index>
        <Index indexName="quotes">
          <IndexResults name="Quotes">
            <Hits />
          </IndexResults>
        </Index>
      </AllResults>
    </InstantSearch>
  );
}

const AllResults = connectStateResults(
  ({ searchState, searching, allSearchResults, children }) => {
    const emptyQuery = !searchState || !searchState.query;
    const hasResults = allSearchResults &&
      Object.values(allSearchResults).some(results => results.nbHits);
    const searchingOrHasResults = searching || hasResults;

    return (
      // Show/hide search state using CSS rather than React to avoid infinite
      // loop issue: https://github.com/algolia/react-instantsearch/issues/137
      <div
        className={classNames({
          'd-none': emptyQuery,
          'mt-3': true,
        })}
      >
        <span className={classNames({ 'd-none': searchingOrHasResults })}>
          No matches for "{searchState.query}".
        </span>
        <div className={classNames({ 'd-none': !searchingOrHasResults })}>
          {children}
        </div>
      </div>
    );
  },
);

const IndexResults = connectStateResults(
  ({ name, searching, searchResults, children }) => {
    const hasResults = searchResults && searchResults.nbHits;
    const searchingOrHasResults = searching || hasResults;

    return (
      // Show/hide search state using CSS rather than React to avoid infinite
      // loop issue: https://github.com/algolia/react-instantsearch/issues/137
      <div
        className={classNames({
          'd-none': !searchingOrHasResults,
          'mt-3': true,
        })}
      >
        <h6 className={styles.heading}>{name}</h6>
        {children}
      </div>
    );
  },
);

const Hits = connectHits(({ hits }) =>
  <div className={styles.hits}>
    {hits.map(hit =>
        <Link
          key={hit.objectID}
          to={hit.objectID}
          // Hide modal when navigating to a search hit.
          onClick={() => $('#searchModal').modal('hide')}
        >
          <Snippet hit={hit} attribute="value" tagName="mark" />
        </Link>
    )}
  </div>
);

// TODO: Check on proper search UX.
//
//   1. Is it okay to leave search query and results when closing and
//      re-opening a search on the same page? The search state only gets
//      cleared when navigating to a new page.
//
//   2. Is it okay for search results to get blanked out when search input is
//      cleared? After typing something new, fresh results will appear.

const SearchBox = connectSearchBox(class extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.debouncedRefine = debounce(this.props.refine, 300);
    this.modal = $('#searchModal');
    // Focus input when modal becomes fully visible.
    this.modal.on('shown.bs.modal', this.focus);
  }

  componentWillUnmount() {
    this.modal.off('shown.bs.modal', this.focus);
  }

  render() {
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <SearchIcon />
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Search"
          ref={this.inputRef}
          onChange={event => this.debouncedRefine(event.target.value)}
        />
      </div>
    );
  }

  focus = () => {
    this.inputRef.current.focus();
  }
});
