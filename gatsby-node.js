const path = require('path');

const { categoryLink } = require('./src/utils/misc');

const COLOR_LIGHTNESS_BUCKETS = (
  ({ numValues, lowest, highest }) => {
    const interval = (highest - lowest) / (numValues - 1);
    return Array.from(new Array(numValues))
      .map((_, i) => lowest + i * interval);
  }
)({ numValues: 5, lowest: 30, highest: 78 });

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
    color: {
      type: 'String!',
      resolve: (source, args, context, info) => {
        const toHash = source.fields.slug;
        const hash = Array.from(toHash).reduce(
          (hash, char) => {
            hash = (hash << 5) - hash + char.charCodeAt(0);
            return hash & hash;
          },
          0,
        );
        const numBuckets = COLOR_LIGHTNESS_BUCKETS.length;
        // Mod the hash by the number of buckets, taking care of negatives.
        const index = (hash % numBuckets + numBuckets) % numBuckets;
        return `hsl(0, 0%, ${COLOR_LIGHTNESS_BUCKETS[index]}%)`;
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