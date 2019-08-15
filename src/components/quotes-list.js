import React from 'react';
import { Link } from 'gatsby';

import QuoteImage from './quote-image';
import ShareButton from './share-button';
import styles from '../styles/quotes-list.module.css';

export default ({ quotes }) => (
  <div className={styles.quotes}>
    {quotes.map(quote =>
      <Link
        key={quote.fields.slug}
        to={quote.fields.slug}
      >
        <div className={styles.image}>
          <QuoteImage quote={quote} />
        </div>
        <div className={styles.text}>
          <q>
            {quote.excerpt}
          </q>
        </div>
        <ShareButton
          shareUrl={quote.fields.slug}
          className={styles.share}
        />
      </Link>
    )}
  </div>
);
