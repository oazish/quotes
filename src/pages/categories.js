import React from 'react';
import { Link, graphql } from 'gatsby';
import classNames from 'classnames';

import Layout from '../components/layout';
import { categoryLink } from '../utils/misc';
import styles from '../styles/categories.module.css';

export default ({ data }) => {
  const categoryImages = new Map(data.allFile.nodes.map(
    ({ name, publicURL }) => [name, publicURL],
  ));

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className={classNames('col-sm', styles.categories)}>
            {data.allMarkdownRemark.group.map(({ category }) =>
              <Link
                key={category}
                className="d-flex m-2 align-items-center text-center"
                to={categoryLink(category)}
                style={{
                  backgroundImage: `url('${categoryImages.get(category)}')`,
                }}
              >
                <span className="w-100 bg-light px-2">
                  {category}
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
      group(field: frontmatter___categories) {
        category: fieldValue
      }
    }
    allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativeDirectory: { eq: "categories" }
      }
    ) {
      nodes {
        name
        publicURL
      }
    }
  }
`;