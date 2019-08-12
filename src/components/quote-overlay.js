import React from 'react';

import QuoteImage from './quote-image';

export default ({ quote }) => (
  <div
    className="
      position-absolute w-100 h-100 d-flex justify-content-center
      align-items-center
    "
    style={{ top: 0, left: 0 }}
  >
    <QuoteImage quote={quote} />
    <blockquote
      className="
        blockquote position-absolute bg-light px-3 py-1 m-3 rounded-lg
      "
      style={{
        left: 0,
        color: 'dimgray',
        opacity: 0.7,
        fontSize: '3vw',
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: quote.html }} />
      <footer className="blockquote-footer">
        {quote.frontmatter.author.name}
      </footer>
    </blockquote>
  </div>
);
