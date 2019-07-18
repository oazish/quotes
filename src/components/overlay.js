import React from 'react';

export default ({ quote }) => (
  <div
    style={{
      width: '212px',
      height: '190px',
      ...(
        quote.image
        ? {
          backgroundImage: `url('${quote.image.publicURL}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
        : {
          backgroundColor: quote.color,
        }
      )
    }}
  />
);