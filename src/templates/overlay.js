import React from 'react';

import Overlay from '../components/overlay';

export default ({ pageContext }) => (
  <>
    <Overlay quote={pageContext.quote} />
    {/* Marker element to let screenshot.js know the page finished rendering.
        Otherwise, it may capture a blank screenshot. */}
    <br hidden data-page-loaded />
  </>
);
