import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';

export default ({ data }) => {
  const quote = data.markdownRemark;
  const categories = quote.frontmatter.categories;

  return (
    <Layout>
      <h1>
        Quote
      </h1>
      <h2>
        Author: {quote.frontmatter.author}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: quote.html }} />
      <hr />
      <p>
        {/* There will always be at least one category per quote. */}
        Categories: <CategoryLink category={categories[0]} />
        {categories.slice(1).map(category => [
          ', ',
          <CategoryLink category={category} />
        ])}
      </p>
    </Layout>
  );
};

const CategoryLink = ({ category }) => (
  <Link to={`/categories/${category.toLowerCase().replace(/ /g, '-')}/`}>
    {category}
  </Link>
);

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        author
        categories
      }
    }
  }
`;