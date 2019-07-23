import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import QuotesList from '../components/quotes-list';

// TODO: Deduplicate common three-column layout between author detail and
//   category detail pages.
export default ({ pageContext, data }) => (
  <Layout>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-auto">
          {
            // TODO: Use a default category color if image is missing.
            !data.file ? null :
              <div
                className="mb-3 mx-auto"
                style={{
                  backgroundImage: `url('${data.file.publicURL}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '210px',
                  height: '210px',
                }}
              />
          }
          <div className="font-weight-bold text-center">
            Category: {pageContext.category}
          </div>
        </div>
        <div className="col-12 mt-3 ml-2 col-lg-8 mt-lg-0">
          <QuotesList markdownRemarkNodes={data.allMarkdownRemark.nodes} />
        </div>
        <div className="col-2">
        </div>
      </div>
    </div>
  </Layout>
);

// TODO: Find way to dedupe pruneLength.
export const query = graphql`
  query($category: String) {
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      nodes {
        excerpt(pruneLength: 200)
        fields {
          slug
        }
        image {
          publicURL
        }
        color
      }
    }
    file(
      sourceInstanceName: { eq: "images" }
      relativeDirectory: { eq: "categories" }
      name: { eq: $category }
    ) {
      publicURL
    }
  }
`;
