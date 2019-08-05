import React from 'react';

export default ({ quote }) => (
  <div
    className="h-100 w-100"
    style={
      quote.image
        ? {
          backgroundImage: `url('${quote.image.publicURL}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
        : { backgroundColor: quote.placeholder.backgroundColor }
    }
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
              opacity: 0.1,
            }}
          />
        )
    }
  </div>
);
