import React from 'react';
import { Link } from 'gatsby';

export default ({ markdownRemarkNodes }) => (
  <ul>
      {markdownRemarkNodes.map(node =>
      <li>
          <Link to={node.fields.slug}>{node.excerpt}</Link>
      </li>
      )}
  </ul>
);
