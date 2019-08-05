import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import { MdShare } from 'react-icons/md';

import QuoteImage from './quote-image.js';
import styles from '../styles/quotes-list.module.css';

export default ({ markdownRemarkNodes: quotes }) => (
  <div className="d-flex flex-column">
    {quotes.map(quote =>
      <div key={quote.fields.slug} className="container-fluid p-0">
        <div className={classNames('row mb-2 border', styles.quote)}>
          <Link
            key={quote.fields.slug}
            to={quote.fields.slug}
            className="col d-flex p-0 text-decoration-none"
          >
            <div className={styles.quoteImage}>
              <QuoteImage quote={quote} />
            </div>
            {/* Necessary to keep long quotes from expanding container. */}
            <div className="mx-3 position-relative h-100 flex-fill">
              <div className={styles.quoteText}>
                {quote.excerpt}
              </div>
            </div>
            <button
              className={classNames('btn btn-link col-auto', styles.shareIcon)}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <MdShare size="24px" />
            </button>
          </Link>
        </div>
      </div>
    )}
  </div>
);
