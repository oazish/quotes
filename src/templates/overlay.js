import React, { useEffect, useState } from 'react';

import QuoteOverlay from '../components/quote-overlay';

const MAX_REM_SIZE = 40;
const MIN_REM_SIZE = 14;

export default ({ pageContext }) => {
  const [fontSizeComputed, setFontSizeComputed] = useState(false);

  useEffect(() => {
    const updateFontSize = () => {
      setDynamicFontSize();
      setFontSizeComputed(true);
    };
    // Since page styles may or may not load when this React component loads,
    // check the page load status first. If loaded, then perform font sizing.
    // Otherwise, defer until page load.
    if (document.readyState === 'complete') {
      updateFontSize();
    } else {
      window.addEventListener('load', updateFontSize);
      return () => {
        window.removeEventListener('load', updateFontSize);
      };
    }
  });

  return (
    <>
      <QuoteOverlay quote={pageContext.quote} />
      {/* Marker element to let screenshot.js know the page finished rendering
          and dynamic font size has been computed. Otherwise, it may capture a
          blank screenshot. */}
      {fontSizeComputed && <br hidden data-page-loaded />}
    </>
  );
};

const setDynamicFontSize = () => {
  let max = MAX_REM_SIZE;
  let min = MIN_REM_SIZE;
  const quoteElement = document.querySelector('blockquote');
  const documentElement = document.documentElement;

  // Limit font determination to 50 iterations, just in case.
  for (let i = 0; i < 50; ++i) {
    const size = Math.floor((max + min) / 2);
    document.documentElement.style.fontSize = `${size}px`;

    // Check for overflow.
    if (quoteElement.clientHeight > documentElement.clientHeight) {
      // Current font size is too large; adjust maximum.
      max = size;
    } else {
      // Current font size is too small; adjust minimum.
      min = size;
    }

    if (max - min <= 1) {
      document.documentElement.style.fontSize = `${min}px`;
      console.log('Settled on font size of', min);
      // Found ideal font size!
      return;
    }
  }

  // TODO: Handle min case where desired outcome is to put ellipsis.
};
