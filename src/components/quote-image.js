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
        : {}
    }
  >
    {
      quote.image
        ? null
        : <PatternPlaceholder placeholder={quote.placeholder} />
    }
  </div>
);

const PatternPlaceholder = ({ placeholder }) => {
  // Avoid collisions between sister SVG elements with same IDs embedded into
  // page by basing it off of foreground color.
  const patternId = `pattern-${placeholder.foregroundColor.slice(1)}`;
  return (
    <svg
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: placeholder.backgroundColor,
      }}
    >
      <defs>
        <mask id="mask" maskContentUnits="objectBoundingBox">
          <image
            href={placeholder.patternFile.publicURL}
            width="1"
            height="1"
          />
        </mask>
        <pattern
          id={patternId}
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
          viewBox="0 0 1 1"
        >
          <rect
            fill={placeholder.foregroundColor}
            width="1"
            height="1"
            mask="url(#mask)"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${patternId})`}
      />
    </svg>
  );
};
