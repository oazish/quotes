// TODO: Consider renaming back to quotes.js when Gatsby issue is resolved:
//   https://github.com/gatsbyjs/gatsby/issues/15334

import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import QuotesList from '../components/quotes-list';

export default ({ data }) => (
  <Layout>
    <h1>
      All Quotes
    </h1>
    <div className="mx-3">
      <QuotesList markdownRemarkNodes={data.allMarkdownRemark.nodes} />
    </div>
  </Layout>
);

export const query = graphql`
  {
    allMarkdownRemark {
      nodes {
        excerpt(pruneLength: 200)
        fields {
          slug
        }
        image {
          publicURL
        }
        color
      }
    }
  }
`;