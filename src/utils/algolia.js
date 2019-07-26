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

const settings = { attributesToSnippet: ['excerpt:20'] };

const queries = [
  {
    query: quotesQuery,
    transformer: ({ data }) => data.quotes.nodes.map(node => ({
      ...node,
      // Object ID should be unique, so set it to quote slug.
      objectID: node.fields.slug,
    })),
    indexName: 'quotes',
    settings,
  },
];

module.exports = queries;
