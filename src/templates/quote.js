import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import { topicLink } from '../utils/misc';
import QuoteImage from '../components/quote-image';

export default ({ data }) => {
  const quote = data.markdownRemark;
  const topics = quote.frontmatter.topics;

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
              {topics.map((topic, i) =>
                <Link
                  className="badge badge-light mr-1"
                  style={{ fontSize: '0.85rem' }}
                  key={topic}
                  to={topicLink(topic)}
                >
                  {topic}
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
        topics
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