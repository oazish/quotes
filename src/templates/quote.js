import React from 'react';
import { graphql } from 'gatsby';

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <div>
      <h1>
        Quote
      </h1>
      <h2>
        Author: {post.frontmatter.author}
      </h2>
      <p dangerouslySetInnerHTML={{ __html: post.html }} />
      <p>
        Categories: 
      </p>
    </div>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        author
        title
      }
    }
  }
`;