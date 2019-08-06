const path = require('path');

const { topicLink } = require('./src/utils/misc');

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
      createNodeField({
        node,
        name: 'quoteId',
        value: parent.name,
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
            topics
          }
          fields {
            slug
            quoteId
          }
        }
      }
    }
  `);

  const quoteTemplate = path.resolve('./src/templates/quote.js');
  const topics = new Set();
  const topicTemplate = path.resolve('./src/templates/topic.js');

  data.allMarkdownRemark.nodes.forEach(node => {
    createPage({
      path: node.fields.slug,
      component: quoteTemplate,
      context: {
        slug: node.fields.slug,
        quoteId: node.fields.quoteId,
      },
    });
    // Add quote topics into the set.
    node.frontmatter.topics.forEach(topic => topics.add(topic));
  });

  topics.forEach(topic => createPage({
    path: topicLink(topic),
    component: topicTemplate,
    context: { topic },
  }));

  if (process.env.NODE_ENV === 'development') {
    const overlayTemplate = path.resolve('./src/templates/overlay.js');
    // Fetch data for overlay page here rather than from the page itself to
    // prevent warning about unused GraphQL query during `gatsby build`
    // (`gatsby develop` is unaffected).
    const { data } = await graphql(`
      {
        allMarkdownRemark {
          nodes {
            frontmatter {
              author {
                name
              }
            }
            html
            image {
              publicURL
            }
            placeholder {
              patternFile {
                publicURL
              }
              foregroundColor
              backgroundColor
            }
            fields {
              slug
            }
          }
        }
      }
    `);

    data.allMarkdownRemark.nodes.forEach(node => createPage({
      path: `/overlay${node.fields.slug}`,
      component: overlayTemplate,
      context: { quote: node },
    }));
  }
};