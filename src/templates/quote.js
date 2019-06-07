import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

export default ({ data }) => {
  const quote = data.markdownRemark;
  return (
    <Layout>
      <h1>
        Quote
      </h1>
      <h2>
        Author: {quote.frontmatter.author}
      </h2>
      <p dangerouslySetInnerHTML={{ __html: quote.html }} />
      <hr />
      <p>
        Categories: {quote.frontmatter.categories.join(', ')}
      </p>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        author
        categories
      }
    }
  }
`;