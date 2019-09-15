import { graphql, useStaticQuery } from 'gatsby';

/**
 * @param {string} path The path to get the absolute URL for. Must start with a
 *   slash.
 */
export const useAbsoluteUrl = path => {
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
  if (path === undefined || path === null) {
    return path;
  }
  path = path || '/';
  if (!path.startsWith(pathPrefix)) {
    path = `${pathPrefix}${path}`;
  }
  return `${baseUrl}${path}`;
};
