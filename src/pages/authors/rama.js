import React from 'react';
// import { graphql } from 'gatsby';

import Layout from '../../components/layout';

export default ({ location }) => (
  <Layout location={location}>
    <h1>About Rama, Frederick Lenz</h1>
    <div>
      Rama, Dr. Frederick Lenz was an enlightened spiritual teacher.
    </div>
  </Layout>
);

// TODO: Add list of quotes by author when there are multiple authors on site.

// export const query = graphql`
//   {
//     allMarkdownRemark(
//       filter: { frontmatter: { author: { id: { eq: "rama" } } } }
//     ) {
//       nodes {
//         frontmatter {
//           author {
//             name
//           }
//         }
//       }
//     }
//   }
// `;