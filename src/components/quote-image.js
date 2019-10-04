import React from 'react';
import Img from 'gatsby-image';

export default ({ quote, onLoad }) => (
  <QuoteBackground quote={quote} onLoad={onLoad}>
    {
      // If quote does not have image, show placeholder foreground.
      quote.image || (
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
      )
    }
  </QuoteBackground>
);

const QuoteBackground = ({ quote, children, onLoad }) => (
  quote.image ? (
    <Img
      className="h-100"
      onLoad={onLoad}
      {...quote.image.childImageSharp}
    />
  ) : (
    <div
      className="h-100"
      style={{
        background: quote.placeholder.backgroundColor,
      }}
    >
      {children}
    </div>
  )
);
