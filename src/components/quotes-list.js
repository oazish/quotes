import React from 'react';
import { Link } from 'gatsby';
import { FaShareAltSquare } from 'react-icons/fa';

export default ({ markdownRemarkNodes: quotes }) => (
  <div className="d-flex flex-column">
      {quotes.map(quote =>
        <div className="container-fluid p-0">
        <div className="row mb-2 border shadow-sm">
          <Link
            key={quote.fields.slug}
            to={quote.fields.slug}
            className="col d-flex p-0 align-items-center text-decoration-none"
          >
            <QuoteImage quote={quote} />
            <div className="m-3">
              {quote.excerpt}
            </div>
          </Link>
          <div className="col-auto d-flex align-items-center">
            <FaShareAltSquare size="32px" color="darkgray" />
          </div>
        </div>
        </div>
      )}
  </div>
);

const QuoteImage = ({ quote }) => {
  const visual = quote.image
    ? (
      <div
        style={{
          backgroundImage: `url('${quote.image.publicURL}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '212px',
          height: '190px',
        }}
      />
    )
    : (
      <div
        style={{
          width: '212px',
          height: '190px',
          backgroundColor: quote.color,
        }}
        className="align-middle d-inline-block"
      />
    );
  return <div className="d-inline-block">{visual}</div>;
};
