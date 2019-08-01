import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import { categoryLink } from '../utils/misc';

export default ({ data }) => (
  <Layout>
    <h1>
      Quote Categories
    </h1>
    <ul>
      {data.allMarkdownRemark.group.map(({ fieldValue: category }) =>
        <li key={category}>
          {
            /*
             * TODO: Deduplicate category link generation, and possibly figure
             * out how to always pre-compute it at build time.
             */
          }
          <Link to={categoryLink(category)}>
            {category}
          </Link>
        </li>
      )}
    </ul>
  </Layout>
);

export const query = graphql`
  {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
      }
    }
  }
`;