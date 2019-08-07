import { graphql, useStaticQuery } from 'gatsby';

/**
 * @param {string} path The path to get the absolute URL for. Must start with a
 *   slash.
 */
export const getAbsoluteUrl = path => {
  const {
    site: {
      siteMetadata: { baseUrl },
      pathPrefix,
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          baseUrl
        }
        pathPrefix
      }
    }
  `);
  path = path || '/';
  if (!path.startsWith(pathPrefix)) {
    path = `${pathPrefix}${path}`;
  }
  return `${baseUrl}${path}`;
};
