import React from 'react';
import { graphql } from 'gatsby';

import Page from '../components/page';
import { Heading, Column } from '../components/layout';
import QuotesList from '../components/quotes-list';

const COLUMN_CLASSNAME = 'col-12 col-lg-8 mx-auto';

export default ({ location, data }) => (
  <Page
    location={location}
    title="Quotes"
    heading={
      <Column className={COLUMN_CLASSNAME}>
        <Heading>Quotes</Heading>
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
        # TODO: Refactor in GraphQL fragment.
        excerpt(pruneLength: 200)
        fields {
          slug
        }
        image {
          childImageSharp {
            # The maximum width at which a quote image may be rendered occurs
            # when quote list has just been collapsed at 768px and the image
            # appears scretched as a background across the quote text.
            fluid(maxWidth: 768) {
              ...GatsbyImageSharpFluid
            }
          }
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
