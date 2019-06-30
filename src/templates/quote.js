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
      <QuoteImage quote={quote} />
      <div dangerouslySetInnerHTML={{ __html: quote.html }} />
      <hr />
      <p>
        {categories.map((category, i) => [
          i > 0 && ', ',
          <Link
            key={category}
            to={`/categories/${kebabCase(category)}/`}
          >
            {category}
          </Link>
        ])}
      </p>
    </Layout>
  );
};

const QuoteImage = ({ quote }) => {
  if (!quote.image) {
    const style = {
      width: '600px',
      height: '400px',
      backgroundColor: quote.color,
    };
    return (
      <div style={style} />
    );
  }

  return (
    <img
      alt={quote.image.name}
      src={quote.image.publicURL}
      style={{ width: '600px' }}
    />
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
      image {
        publicURL
      }
      color
    }
  }
`;