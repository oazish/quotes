import React from 'react';
import { Link } from 'gatsby';

export default ({ markdownRemarkNodes: quotes }) => (
  <ul>
      {quotes.map(quote =>
      <li key={quote.fields.slug} className="mb-1">
          <Link to={quote.fields.slug} className="text-decoration-none">
            <QuoteImage quote={quote} />
            {' '}
            {quote.excerpt}
          </Link>
      </li>
      )}
  </ul>
);

const QuoteImage = ({ quote }) => {
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
        className="align-middle d-inline-block"
      />
    );
  return <div className="d-inline-block">{visual}</div>;
};
