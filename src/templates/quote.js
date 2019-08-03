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
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <div style={{ width: '100%', height: 300 }}>
              <QuoteImage quote={quote} />
            </div>
            <blockquote class="blockquote mt-3">
              <div dangerouslySetInnerHTML={{ __html: quote.html }} />
              <footer class="blockquote-footer">
                <Link to={`/authors/${quote.frontmatter.author.id}/`}>
                  {quote.frontmatter.author.name}
                </Link>
              </footer>
            </blockquote>
            <hr />
            <p>
              {categories.map((category, i) =>
                <Link
                  className="badge badge-light mr-1"
                  style={{ fontSize: '0.85rem' }}
                  key={category}
                  to={categoryLink(category)}
                >
                  {category}
                </Link>
              )}
            </p>
          </div>
        </div>
      </div>
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