import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import { topicLink } from '../utils/misc';
import QuoteImage from '../components/quote-image';

export default ({ location, data }) => {
  const { quote, shareableImage } = data;
  const { topics, author } = quote.frontmatter

  return (
    <Layout
      location={location}
      image={shareableImage.publicURL}
      title={`Quote by ${author.name}`}
      type="article"
    >
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <div style={{ width: '100%', height: 300 }}>
              <QuoteImage quote={quote} />
            </div>
            <blockquote className="blockquote mt-3">
              <div dangerouslySetInnerHTML={{ __html: quote.html }} />
              <footer className="blockquote-footer">
                <Link to={`/authors/${author.id}/`}>
                  {author.name}
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
  query($slug: String!, $quoteId: String!) {
    quote: markdownRemark(fields: { slug: { eq: $slug } }) {
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
    shareableImage: file(
      sourceInstanceName: { eq: "images" }
      relativeDirectory: { eq: "overlays/quotes" }
      name: { eq: $quoteId }
    ) {
      publicURL
    }
  }
`;