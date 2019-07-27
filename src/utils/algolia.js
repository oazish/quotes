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
];

module.exports = queries;
