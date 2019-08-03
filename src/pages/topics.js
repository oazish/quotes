import React from 'react';
import { Link, graphql } from 'gatsby';
import classNames from 'classnames';

import Layout from '../components/layout';
import { topicLink } from '../utils/misc';
import styles from '../styles/topics.module.css';

export default ({ data }) => {
  const topicImages = new Map(data.allFile.nodes.map(
    ({ name, publicURL }) => [name, publicURL],
  ));

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className={classNames('col-sm', styles.topics)}>
            {data.allMarkdownRemark.group.map(({ topic }) =>
              <Link
                key={topic}
                className="d-flex m-2 align-items-center text-center"
                to={topicLink(topic)}
                style={{
                  backgroundImage: `url('${topicImages.get(topic)}')`,
                }}
              >
                <span className="w-100 bg-light px-2">
                  {topic}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
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