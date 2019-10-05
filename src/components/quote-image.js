import React from 'react';
import Img from 'gatsby-image';

export default ({ quote, onLoad }) => (
  quote.image ? (
    <Img
      className="h-100"
      onLoad={onLoad}
      {...quote.image.childImageSharp}
    />
  ) : (
    // If quote does not have image, render a placeholder, consisting of a
    // background solid color and foreground translucent pattern overlay.
    <div
      className="h-100"
      style={{
        background: quote.placeholder.backgroundColor,
      }}
    >
      <div
        className="w-100 h-100"
        style={{
          backgroundImage:
            `url(${quote.placeholder.patternFile.publicURL})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '160px',
          opacity: 0.1,
        }}
      />
    </div>
  )
);
