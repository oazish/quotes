const queries = require('./src/utils/algolia');

const algoliaPlugin = {
  resolve: 'gatsby-plugin-algolia',
  options: {
    appId: process.env.GATSBY_ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_ADMIN_KEY,
    queries,
    chunkSize: 10000, // default: 1000
  },
};

module.exports = {
  pathPrefix: '/spiritual-quotes',
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'quotes',
        path: `${__dirname}/src/quotes`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-yaml',
    'gatsby-plugin-react-helmet',
    // Only configure Algolia plugin if needed environment variables are set.
    ...(
      algoliaPlugin.options.appId && algoliaPlugin.options.apiKey
      ? [algoliaPlugin]
      : []
    ),
  ],
  mapping: {
    'MarkdownRemark.frontmatter.author': 'AuthorsYaml',
  },
};
