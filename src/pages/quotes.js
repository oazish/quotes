import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import QuotesList from '../components/quotes-list';

export default ({ data }) => (
  <Layout>
    <h1>
      All Quotes
    </h1>
    <QuotesList markdownRemarkNodes={data.allMarkdownRemark.nodes} />
  </Layout>
);

export const query = graphql`
  {
    allMarkdownRemark {
      nodes {
        excerpt(pruneLength: 50)
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