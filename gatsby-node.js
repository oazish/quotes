const path = require('path');
const kebabCase = require('lodash/kebabcase');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const parent = getNode(node.parent);

    if (parent.sourceInstanceName === 'quotes') {
      createNodeField({
        node,
        name: 'slug',
        value: `/quotes/${parent.name}/`,
      });
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          frontmatter {
            categories
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  const quoteTemplate = path.resolve('./src/templates/quote.js');
  const categories = new Set();
  const categoryTemplate = path.resolve('./src/templates/category.js');

  data.allMarkdownRemark.nodes.forEach(node => {
    createPage({
      path: node.fields.slug,
      component: quoteTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    });
    // Add the post categories into the set.
    node.frontmatter.categories.forEach(category => categories.add(category));
  });

  categories.forEach(category => createPage({
    path: `/categories/${kebabCase(category)}/`,
    component: categoryTemplate,
    context: { category },
  }));
};