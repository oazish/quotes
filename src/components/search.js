import React from 'react';
import { Link } from 'gatsby';
import debounce from 'lodash/debounce';
import {
  Snippet,
  connectSearchBox,
  connectHits,
} from 'react-instantsearch-dom';

export const SearchBox = connectSearchBox(({ refine }) => {
  const debouncedRefine = debounce(refine, 300);

  return (
    <input
      onChange={event => debouncedRefine(event.target.value)}
      placeholder="Search for quotes..."
    />
  );
});

export const Hits = connectHits(({ hits }) =>
  <ol>
    {hits.map(hit =>
      <li key={hit.objectID}>
        <Link to={hit.objectID} className="text-decoration-none">
          <Snippet hit={hit} attribute="value" tagName="mark" />
        </Link>
      </li>
    )}
  </ol>
);