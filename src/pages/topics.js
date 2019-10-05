import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import classNames from 'classnames';

import Page from '../components/page';
import { topicLink } from '../utils/shared';
import styles from '../styles/topics.module.css';
import { Heading, Column } from '../components/layout';

const COLUMN_CLASSNAME = 'col-12 col-md-10 col-lg-8 mx-auto';
// IMPORTANT: Keep in sync with GraphQL query (search for TOPIC_SIZE_PX).
const TOPIC_SIZE_PX = 200;

export default ({ location, data }) => {
  const topicImages = new Map(data.allFile.nodes.map(
    ({ name, childImageSharp }) => [name, childImageSharp],
  ));

  return (
    <Page
      location={location}
      title="Quote Topics"
      heading={
        <Column className={COLUMN_CLASSNAME}>
          <Heading>Topics</Heading>
        </Column>
      }
    >
      <Column className={classNames(COLUMN_CLASSNAME, styles.topics)}>
        <section style={{ '--topic-size': `${TOPIC_SIZE_PX}px` }}>
          {data.allMarkdownRemark.group.map(({ topic }) => {
            const image = topicImages.get(topic);
            return (
              <Link key={topic} to={topicLink(topic)}>
                <aside className={styles.overlay}>
                  <span>{topic}</span>
                </aside>
                <TopicImage
                  image={image}
                  className={styles.image}
                />
              </Link>
            );
          })}
        </section>
      </Column>
    </Page>
  );
};

const TopicImage = ({ image, ...rest }) => (
  image ? (
    <Img {...image} {...rest} />
  ) : (
    <div className={styles.placeholder} />
  )
);

export const query = graphql`
  {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___topics) {
        topic: fieldValue
      }
    }
    allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativeDirectory: { eq: "topics" }
      }
    ) {
      nodes {
        name
        childImageSharp {
          # IMPORTANT: Keep in sync with TOPIC_SIZE_PX.
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`;
