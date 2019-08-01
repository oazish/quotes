const { categoryLink } = require('./misc');

const quotesQuery = `
  {
    quotes: allMarkdownRemark {
      nodes {
        excerpt(pruneLength: 5000)
        fields {
          slug
        }
      }
    }
  }
`;

const categoriesQuery = `
  {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___categories) {
        category: fieldValue
      }
    }
  }
`;

const queries = [
  {
    query: quotesQuery,
    transformer: ({ data }) => data.quotes.nodes.map(node => ({
      value: node.excerpt,
      // Object ID should be unique, so set it to quote slug.
      objectID: node.fields.slug,
    })),
    indexName: 'quotes',
  },
  {
    query: categoriesQuery,
    transformer: ({ data }) => data.allMarkdownRemark.group.map(
      ({ category }) => ({
        value: category,
        // Object ID should be unique, so set it to category slug.
        objectID: categoryLink(category),
      })),
    indexName: 'categories',
  },
];

module.exports = queries;
