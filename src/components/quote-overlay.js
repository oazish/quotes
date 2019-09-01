import React from 'react';

import QuoteImage from './quote-image';
import styles from '../styles/quote-overlay.module.css';

export default ({ quote }) => (
  <main className={styles.overlay}>
    <aside>
      <div>
        <QuoteImage quote={quote} />
      </div>
    </aside>
    <blockquote className="blockquote">
      <h1 dangerouslySetInnerHTML={{ __html: quote.html }} />
      <footer className="blockquote-footer" style={{ color: '#eee' }}>
        {quote.frontmatter.author.name}
      </footer>
    </blockquote>
  </main>
);
