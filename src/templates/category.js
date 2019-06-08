import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import QuotesList from '../components/quotes-list';

export default ({ pageContext, data }) => (
  <Layout>
    <h1>Quotes</h1>
    <h2>Category: {pageContext.category}</h2>
    <QuotesList markdownRemarkNodes={data.allMarkdownRemark.nodes} />
  </Layout>
);

// TODO: Find way to dedupe pruneLength.
export const query = graphql`
  query($category: String) {
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      nodes {
        excerpt(pruneLength: 50)
        fields {
          slug
        }
      }
    }
  }
`;
