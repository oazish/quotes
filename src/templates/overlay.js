import React from 'react';
import { graphql } from 'gatsby';

import Overlay from '../components/overlay';

export default ({ pageContext, data }) => (
  <Overlay quote={data.markdownRemark} />
);

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      image {
        publicURL
      }
      color
    }
  }
`;