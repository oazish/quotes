import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import classNames from 'classnames';

import Page from '../components/page';
import QuotesList from '../components/quotes-list';
import { Heading, Column } from '../components/layout';

const COLUMN_CLASSNAME = 'col-12 col-lg-8 mt-lg-0 mx-auto';

export default ({ location, pageContext, data }) => (
  <Page
    location={location}
    title={`${pageContext.topic} Quotes`}
    background={
      data.file ? (
        <Img
          className="h-100"
          {...data.file.childImageSharp}
        />
      ) :
      undefined
    }
    heading={
      <Column className={COLUMN_CLASSNAME}>
        <Heading>{pageContext.topic}</Heading>
      </Column>
    }
  >
    <Column className={classNames(COLUMN_CLASSNAME, 'mt-3 ml-2 mt-lg-0')}>
      <QuotesList quotes={data.allMarkdownRemark.nodes} />
    </Column>
  </Page>
);

// TODO: Find way to dedupe pruneLength.
export const query = graphql`
  query($topic: String) {
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { topics: { in: [$topic] } } }
    ) {
      # TODO: Refactor in GraphQL fragment.
      nodes {
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
    file(
      sourceInstanceName: { eq: "images" }
      relativeDirectory: { eq: "topics" }
      name: { eq: $topic }
    ) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
