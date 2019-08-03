import React from 'react';
import { Link } from 'gatsby';

import QuoteImage from './quote-image.js';

export default ({ markdownRemarkNodes: quotes }) => (
  <div className="d-flex flex-column">
      {quotes.map(quote =>
        <div key={quote.fields.slug} className="container-fluid p-0">
          <div className="row mb-2 border shadow-sm">
            <Link
              key={quote.fields.slug}
              to={quote.fields.slug}
              className="col d-flex p-0 text-decoration-none"
            >
              <div
                className="d-inline-block"
                style={{ width: '212px', height: '190px' }}
              >
                <QuoteImage quote={quote} />
              </div>
              {/* Necessary to keep long quotes from expanding container. */}
              <div
                className="mx-3 position-relative h-100 flex-fill"
              >
                <div
                  className="position-absolute overflow-hidden align-items-center d-flex"
                  style={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                  {quote.excerpt}
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
  </div>
);
