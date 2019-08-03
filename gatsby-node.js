const path = require('path');

const { categoryLink } = require('./src/utils/misc');

const COLORS = [
  // Tibetan color scheme
  '#F35F00',
  '#b50047',
  '#DF3A0A',
  '#D88508',
  '#FFB910',
];

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

exports.createResolvers = ({ createResolvers }) => createResolvers({
  MarkdownRemark: {
    image: {
      type: 'File',
      resolve: async (source, args, context, info) => {
        const fileNode = context.nodeModel.getNodeById({
          id: source.parent,
          type: 'File',
        });
        const result = await context.nodeModel.runQuery({
          type: 'File',
          firstOnly: true,
          query: {
            filter: {
              sourceInstanceName: { eq: 'images' },
              relativeDirectory: { eq: 'quotes' },
              name: { eq: fileNode.name },
            },
          },
        });
        return result;
      },
    },
    placeholder: {
      type: `type Placeholder {
        patternFile: File
        foregroundColor: String!
        backgroundColor: String!
      }`,
      resolve: async (source, args, context, info) => {
        const patternFiles = await context.nodeModel.runQuery({
          type: 'File',
          query: {
            filter: {
              sourceInstanceName: { eq: 'images' },
              relativeDirectory: { eq: 'patterns' },
            },
          },
        });
        const toHash = source.fields.slug;
        const hash = Array.from(toHash).reduce(
          (hash, char) => {
            hash = (hash << 5) - hash + char.charCodeAt(0);
            return hash & hash;
          },
          0,
        );
        // There are C foreground color choices and C - 1 background color
        // choices (to keep foreground color different from background color).
        const colorChoices = COLORS.length * (COLORS.length - 1);
        const totalChoices = patternFiles.length * colorChoices;
        // Add total choices to modded hash to eliminate negative values.
        const moddedHash = (hash % totalChoices + totalChoices) % totalChoices;
        const foregroundColorIndex = moddedHash % COLORS.length;
        const backgroundColorIndex = moddedHash % (COLORS.length - 1);
        return {
          patternFile: patternFiles[Math.floor(moddedHash / colorChoices)],
          foregroundColor: COLORS[foregroundColorIndex],
          // If background color lands on or after the index for foreground
          // color, shift the index by 1.
          backgroundColor: COLORS[backgroundColorIndex + (
            backgroundColorIndex >= foregroundColorIndex
          )],
        };
      },
    },
  },
});

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
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
      context: { slug: node.fields.slug },
    });
    // Add the post categories into the set.
    node.frontmatter.categories.forEach(category => categories.add(category));
  });

  categories.forEach(category => createPage({
    path: categoryLink(category),
    component: categoryTemplate,
    context: { category },
  }));
};