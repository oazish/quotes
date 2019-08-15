import React from 'react';
import { Link, graphql } from 'gatsby';
import classNames from 'classnames';

import Layout from '../components/layout';
import { topicLink } from '../utils/shared';
import styles from '../styles/topics.module.css';
import { Heading, Column } from '../components/content';

const COLUMN_CLASSNAME = 'col-12 col-md-10 col-lg-8 mx-auto';

export default ({ location, data }) => {
  const topicImages = new Map(data.allFile.nodes.map(
    ({ name, publicURL }) => [name, publicURL],
  ));

  return (
    <Layout
      location={location}
      title="Quote Topics"
      heading={
        <Column className={COLUMN_CLASSNAME}>
          <Heading>Topics</Heading>
        </Column>
      }
    >
      <Column className={classNames(COLUMN_CLASSNAME, styles.topics)}>
        {data.allMarkdownRemark.group.map(({ topic }) => {
          const image = topicImages.get(topic);
          return (
            <Link
              key={topic}
              to={topicLink(topic)}
              style={{
                background: image
                  ? `url('${image}') center / cover`
                  : 'gray',
              }}
            >
              <div className={styles.overlay}>
                <span className="bg-light">{topic}</span>
              </div>
            </Link>
          );
        })}
      </Column>
    </Layout>
  );
};

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
        publicURL
      }
    }
  }
`;