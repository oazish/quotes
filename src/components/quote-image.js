import React from 'react';

export default ({ quote }) => (
  <div
    className="h-100 w-100"
    style={{
      background: quote.image
        ? `url('${quote.image.publicURL}') center / cover`
        : quote.placeholder.backgroundColor,
    }}
  >
    {
      quote.image
        ? null
        : (
          <div
            className="w-100 h-100"
            style={{
              backgroundImage:
                `url(${quote.placeholder.patternFile.publicURL})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '10rem',
              opacity: 0.1,
            }}
          />
        )
    }
  </div>
);
