import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';

import QuoteImage from './quote-image';
import ShareButton from './share-button';
import styles from '../styles/quotes-list.module.css';

export default ({ quotes }) => (
  <div className="d-flex mt-2 flex-column">
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
            <ShareButton
              shareUrl={quote.fields.slug}
              className="col-auto d-flex align-items-center"
            />
          </Link>
        </div>
      </div>
    )}
  </div>
);
