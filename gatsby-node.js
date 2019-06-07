const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'src/quotes' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          frontmatter {
            author
            categories
          }
          fields {
            slug
          }
        }
      }
    }
  `);
  // TODO: Potentially generate quote URL from prefix of its excerpt.
  //data.allMarkdownRemark.nodes[0].excerpt.split(/\.|!|\?/)[0].split(/\s/).map(word => word.toLowerCase()).join('-')

  data.allMarkdownRemark.nodes.forEach(node => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/quote.js'),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
};