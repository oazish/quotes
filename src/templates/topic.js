import React from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames';

import Page from '../components/page';
import QuotesList from '../components/quotes-list';
import { Background, Heading, Column } from '../components/content';

const COLUMN_CLASSNAME = 'col-12 col-lg-8 mt-lg-0 mx-auto';

export default ({ location, pageContext, data }) => (
  <Page
    location={location}
    title={`${pageContext.topic} Quotes`}
    // TODO: And if it's null?
    background={
      <Background
        style={{
          background: data.file
            ? `url('${data.file.publicURL}') center / cover`
            : undefined,
        }}
      />
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
