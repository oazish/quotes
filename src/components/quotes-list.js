import React from 'react';
import { Link } from 'gatsby';

export default ({ markdownRemarkNodes: quotes }) => (
  <ul>
      {quotes.map(quote =>
      <li key={quote.fields.slug}>
          <QuoteImage quote={quote} />
          {' '}
          <Link to={quote.fields.slug}>{quote.excerpt}</Link>
      </li>
      )}
  </ul>
);

const QuoteImage = ({ quote }) => {
  debugger;
  const visual = quote.image
    ? (
      <img
        alt={quote.image.name}
        src={quote.image.publicURL}
        style={{ width: '99px' }}
      />
    )
    : (
      <div
        style={{
          width: '99px',
          height: '66px',
          backgroundColor: quote.color,
        }}
      />
    );
  return <div style={{ display: 'inline-block' }}>{visual}</div>;
};
