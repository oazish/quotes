// TODO: Consider renaming back to quotes.js when Gatsby issue is resolved:
//   https://github.com/gatsbyjs/gatsby/issues/15334

import React from 'react';
import { graphql } from 'gatsby';

import Page from '../components/page';
import { Heading, Column } from '../components/content';
import QuotesList from '../components/quotes-list';

const COLUMN_CLASSNAME = 'col-12 col-lg-8 mx-auto';

export default ({ location, data }) => (
  <Page
    location={location}
    title="All Quotes"
    heading={
      <Column className={COLUMN_CLASSNAME}>
        <Heading>All Quotes</Heading>
      </Column>
    }
  >
    <Column className={COLUMN_CLASSNAME}>
      <QuotesList quotes={data.allMarkdownRemark.nodes} />
    </Column>
  </Page>
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