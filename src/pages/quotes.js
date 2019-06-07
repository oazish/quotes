import React from 'react';
import { Link, graphql } from 'gatsby';

export default ({ data }) => (
  <div>
    <h1>
      All Quotes
    </h1>
    <ul>
      {data.allMarkdownRemark.nodes.map(node =>
        <li>
          <Link to={node.fields.slug}>{node.excerpt}</Link>
        </li>
      )}
    </ul>
  </div>
);

export const query = graphql`
  {
    allMarkdownRemark {
      nodes {
        excerpt(pruneLength: 50)
        frontmatter {
          author
          categories
        }
        fields {
          slug
        }
      }
    }
  }
`;