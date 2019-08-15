import React from 'react';
import { graphql, Link } from 'gatsby';
import classNames from 'classnames';

import Layout from '../components/layout';
import ShareButton from '../components/share-button';
import { topicLink } from '../utils/shared';
import QuoteImage from '../components/quote-image';
import { Column } from '../components/content';
import { SHAREABLE_IMAGE_DIMENSIONS } from '../utils/shared';
import styles from '../styles/quote.module.css';

const COLUMN_CLASSNAME = 'col-12 col-md-12 col-lg-8 mx-auto';

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
      background={<QuoteImage quote={quote} />}
      heading={
        <Column className={COLUMN_CLASSNAME}>
          <blockquote className={classNames('blockquote', styles.blockquote)}>
            <h1
              className="h4"
              dangerouslySetInnerHTML={{ __html: quote.html }}
            />
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
        </Column>
      }
    >
      <Column className={classNames(COLUMN_CLASSNAME, 'mt-2')}>
        <div className={styles.topics}>
          {topics.map((topic, i) =>
            <Link
              className="badge badge-dark"
              key={topic}
              to={topicLink(topic)}
            >
              {topic}
            </Link>
          )}
        </div>
      </Column>
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