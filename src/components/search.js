import React from 'react';
import { Link } from 'gatsby';
import debounce from 'lodash/debounce';
import algoliasearch from 'algoliasearch/lite';
import {
  Configure,
  InstantSearch,
  Snippet,
  connectSearchBox,
  connectHits,
} from 'react-instantsearch-dom';
import { IoMdSearch } from 'react-icons/io';
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

export const Search = () => (
  <InstantSearch indexName="quotes" searchClient={searchClient}>
    <Configure
      hitsPerPage={30}
      attributesToSnippet={['value:20']}
      snippetEllipsisText={'\u2026'}
      // Do not fetch additional attributes beyond snippeted ones.
      attributesToRetrieve={[]}
    />
    <SearchBar />
    <div className="mt-3">
      <Hits />
    </div>
  </InstantSearch>
);

// TODO(search-ux): When cancelling out of a search and then returning, old
//   results should be cleared. When clearing search input by backspace and
//   then typing something, search results prior to empty input should be
//   preserved.

// TODO: Make sure "X" icon works on iOS, Android, Windows
const SearchBar = connectSearchBox(class extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.debouncedRefine = debounce(this.props.refine, 300);
    this.modal = $('#searchModal');
    this.modal
      // Focus input when modal becomes fully visible.
      .on('shown.bs.modal', this.focus)
      // Clear search when modal becomes fully hidden.
      .on('hidden.bs.modal', this.clear);
  }

  componentWillUnmount() {
    this.modal
      .off('shown.bs.modal', this.focus)
      .off('hidden.bs.modal', this.clear);
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

  clear = () => {
    this.inputRef.current.value = '';
  }
});

export const Hits = connectHits(({ hits }) =>
  <div className={styles.hits}>
    {hits.map(hit =>
      <Link
        key={hit.objectID}
        to={hit.objectID}
        className="
          text-decoration-none d-block position-relative pb-2 mt-2
          border-bottom
        "
        // Hide modal when navigating to a search hit.
        onClick={() => $('#searchModal').modal('hide')}
      >
        <Snippet hit={hit} attribute="value" tagName="mark" />
      </Link>
    )}
  </div>
);

export const SearchIcon = props => <IoMdSearch size="22px" {...props} />;