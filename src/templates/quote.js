import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import { categoryLink } from '../utils/misc';
import QuoteImage from '../components/quote-image';

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
      <div style={{ width: 500, height: 300 }}>
        <QuoteImage quote={quote} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: quote.html }} />
      <h3>Categories</h3>
      <p>
        {categories.map((category, i) =>
          <Link
            className="badge badge-light mr-1"
            key={category}
            to={categoryLink(category)}
          >
            {category}
          </Link>
        )}
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
      image {
        publicURL
      }
      placeholder {
        patternFile {
          publicURL
        }
        foregroundColor
        backgroundColor
      }
    }
  }
`;