// TODO: Consider renaming back to quotes.js when Gatsby issue is resolved:
//   https://github.com/gatsbyjs/gatsby/issues/15334

import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import QuotesList from '../components/quotes-list';

export default ({ location, data }) => (
  <Layout location={location} title="All Quotes">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-8 mx-auto">
          <QuotesList quotes={data.allMarkdownRemark.nodes} />
        </div>
      </div>
    </div>
  </Layout>
);

export const query = graphql`
  {
    allMarkdownRemark {
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
  }
`;