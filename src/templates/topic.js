import React from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames';

import Layout from '../components/layout';
import QuotesList from '../components/quotes-list';
import styles from '../styles/topic.module.css';

// TODO: Deduplicate common three-column layout between author detail and
//   topic detail pages.
export default ({ location, pageContext, data }) => (
  <Layout
    location={location}
    title={`${pageContext.topic} Quotes`}
    // TODO: And if it's null?
    background={
      <div
        className="h-100 w-100 position-fixed"
        style={{
          background: `url('${data.file.publicURL}') center center / cover`,
          backgroundPosition: `0 100%`,
        }}
      />
    }
  >
    <div className={styles.topic}>
      <h1>
        <span>{pageContext.topic}</span>
      </h1>
      {/* Hack to force white background for topics with short lists of
        * quotes */}
      <div
        style={{
          backgroundColor: 'white',
          width: '100vw',
          height: '100vh',
          marginBottom: '-100vh',
        }}
      />
      <div className="container-fluid" style={{ backgroundColor: 'white' }}>
        <div className="row">
          <div
            className={
              classNames(
                'col-12 mx-auto mt-3 ml-2 col-lg-8 mt-lg-0',
                styles.quotesList,
              )
            }
          >
            <QuotesList quotes={data.allMarkdownRemark.nodes} />
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

// TODO: Find way to dedupe pruneLength.
export const query = graphql`
  query($topic: String) {
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { topics: { in: [$topic] } } }
    ) {
      nodes {
        excerpt(pruneLength: 200)
        fields {
          slug
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
    file(
      sourceInstanceName: { eq: "images" }
      relativeDirectory: { eq: "topics" }
      name: { eq: $topic }
    ) {
      publicURL
    }
  }
`;
