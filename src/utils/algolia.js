const { topicLink } = require('./shared');

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

const topicsQuery = `
  {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___topics) {
        topic: fieldValue
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
    query: topicsQuery,
    transformer: ({ data }) => data.allMarkdownRemark.group.map(
      ({ topic }) => ({
        value: topic,
        // Object ID should be unique, so set it to topic slug.
        objectID: topicLink(topic),
      })),
    indexName: 'topics',
  },
];

module.exports = queries;
