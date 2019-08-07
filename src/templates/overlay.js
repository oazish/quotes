import React from 'react';

import QuoteOverlay from '../components/quote-overlay';

export default ({ pageContext }) => (
  <>
    <QuoteOverlay quote={pageContext.quote} />
    {/* Marker element to let screenshot.js know the page finished rendering.
        Otherwise, it may capture a blank screenshot. */}
    <br hidden data-page-loaded />
  </>
);
