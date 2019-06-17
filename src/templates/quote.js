import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

import Layout from '../components/layout';

export default ({ data }) => {
  const quote = data.markdownRemark;
  const categories = quote.frontmatter.categories;

  return (
    <Layout>
      <h1>
        Quote
      </h1>
      <h2>
        Author:
        {' '}
        <Link to={`/authors/${quote.frontmatter.author.id}/`}>
          {quote.frontmatter.author.name}
        </Link>
      </h2>
      <div dangerouslySetInnerHTML={{ __html: quote.html }} />
      <hr />
      <p>
        {categories.map((category, i) => [
          i > 0 && ', ',
          <Link to={`/categories/${kebabCase(category)}/`}>
            {category}
          </Link>
        ])}
      </p>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        author {
          id
          name
        }
        categories
      }
    }
  }
`;