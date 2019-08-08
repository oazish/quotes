import React from 'react';
import { graphql, Link } from 'gatsby';
import classNames from 'classnames';

import Layout from '../components/layout';
import ShareButton from '../components/share-button';
import { topicLink } from '../utils/shared';
import QuoteImage from '../components/quote-image';
import { SHAREABLE_IMAGE_DIMENSIONS } from '../utils/shared';
import styles from '../styles/quote.module.css';

export default ({ location, data }) => {
  const { quote, shareableImage } = data;
  const { topics, author } = quote.frontmatter;

  return (
    <Layout
      location={location}
      title={`Quote by ${author.name}`}
      type="article"
      image={shareableImage.publicURL}
      imageWidth={SHAREABLE_IMAGE_DIMENSIONS.width}
      imageHeight={SHAREABLE_IMAGE_DIMENSIONS.height}
      background={
        <div
          className="h-100"
          style={{
            backgroundColor: 'black',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
          }}
        >
          <div className="h-100" style={{ opacity: 1 }}>
            <QuoteImage quote={quote} />
          </div>
        </div>
      }
    >
      <div className="container">
        <div className="row">
          <div
            className={classNames(
              'col-12 col-md-12 col-lg-8 mx-auto mt-2 mb-3 py-2',
              styles.quote,
            )}
          >
            <blockquote className="blockquote">
              <div dangerouslySetInnerHTML={{ __html: quote.html }} />
              <footer className="blockquote-footer">
                <Link to={`/authors/${author.id}/`}>
                  {author.name}
                </Link>
                <ShareButton
                  className={styles.shareButton}
                  shareUrl={location.pathname}
                />
              </footer>
            </blockquote>
            <hr />
            <div className={styles.topics}>
              {topics.map((topic, i) =>
                <Link
                  className="badge badge-dark mr-1"
                  key={topic}
                  to={topicLink(topic)}
                >
                  {topic}
                </Link>
              )}
            </div>
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