import React from 'react';

import QuoteImage from './quote-image';
import styles from '../styles/quote-overlay.module.css';

export default ({ quote }) => (
  <main className={styles.overlay}>
    <aside>
      <QuoteImage quote={quote} />
    </aside>
    <section>
      <blockquote className="blockquote">
        <h1 dangerouslySetInnerHTML={{ __html: quote.html }} />
        <footer className="blockquote-footer" style={{ color: '#333' }}>
          {quote.frontmatter.author.name}
        </footer>
      </blockquote>
    </section>
  </main>
);
