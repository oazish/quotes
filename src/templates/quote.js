import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import ShareButton from '../components/share-button';
import { topicLink } from '../utils/shared';
import QuoteImage from '../components/quote-image';

export default ({ location, data }) => {
  const { quote, shareableImage } = data;
  const { topics, author } = quote.frontmatter;

  return (
    <Layout
      location={location}
      title={`Quote by ${author.name}`}
      type="article"
      image={shareableImage.publicURL}
      imageWidth={1024}
      imageHeight={1024}
    >
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <div className="w-100 position-relative" style={{ height: 300 }}>
              <QuoteImage quote={quote} />
              <ShareButton
                shareUrl={location.pathname}
                className="position-absolute"
                style={{
                  left: '100%',
                  top: '50%',
                  // Bump up so that middle (rather than top) is at 50%.
                  transform: 'translate(0, -50%)',
                }}
              />
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