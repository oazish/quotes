import React from 'react';
import { Link, withPrefix, graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

import { Search, SearchIcon } from './search';
import logo from '../assets/images/logo.png';

export default props => {
  const { site: { siteMetadata: { baseUrl } } } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          baseUrl
        }
      }
    }
  `);
  const { location, image, ...remainingProps } = props;
  return (
    <Layout
      url={`${baseUrl}${location.pathname || '/'}`}
      image={image && `${baseUrl}${image}`}
      {...remainingProps}
    />
  );
};

const Layout = ({
  url,
  title,
  description,
  image,
  children,
  type = 'website',
}) => (
  <>
    <Helmet>
      <title>{title}</title>
      <link rel="icon" type="image/x-icon" href={withPrefix('/favicon.ico')} />
      <meta key="description" name="description" content={description} />
      <meta key="image" name="image" content={image} />
      {/* OpenGraph tags for Facebook sharing. */}
      <meta key="type" property="og:type" content={type} />
      {url && <meta key="ogUrl" property="og:url" content={url} />}
      {image && [
        // Helmet does not support React fragments, so use list instead.
        <meta key="ogImage" property="og:image" content={image} />,
        <meta key="ogImageWidth" property="og:image:width" content="1024" />,
        <meta key="ogImageHeight" property="og:image:height" content="1024" />,
      ]}
      {title && <meta key="ogTitle" property="og:title" content={title} />}
      {description && (
        <meta
          key="ogDescription"
          property="og:description"
          content={description}
        />
      )}
    </Helmet>
    <Navbar />
    <div className="p-3">
      {children}
    </div>
  </>
);

const Navbar = () => (
  <nav
    className="navbar-expand-md navbar-light bg-light pl-3 d-flex flex-wrap"
  >
    <div
      className="align-self-center flex-grow-1 flex-md-grow-0"
      // With `flex-basis: 0`, logo renders closer to center in collapsed mode.
      style={{ flexBasis: 0 }}
    >
      <button
        type="button"
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
    </div>
    <Logo className="d-md-none p-1" />
    {/*
      * In collapsed mode, render empty element on right to balance out button
      * on left to center logo.
      */}
    <div className="flex-grow-1 d-md-none" />
    <div
      id="navbarNav"
      className="collapse navbar-collapse navbar-nav justify-content-md-around"
    >
      <Link
        to="/quotes/"
        className="nav-item nav-link"
        activeClassName="active"
      >
        Quotes
      </Link>
      <Link
        to="/topics/"
        className="nav-item nav-link"
        activeClassName="active"
      >
        Topics
      </Link>
      <Logo className="nav-item nav-link d-none d-md-block" />
      <Link
        to="/authors/rama/"
        className="nav-item nav-link"
        activeClassName="active"
      >
        About Rama
      </Link>
      <button
        type="button"
        aria-label="Search"
        className="btn btn-link nav-link"
        data-target="#searchModal"
        data-toggle="modal"
      >
        <SearchIcon className="d-none d-md-inline" />
        <span className="d-md-none">Search</span>
      </button>
      {/* TODO: Refactor modal along with element ID into search.js. */}
      <div
        id="searchModal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Search</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Search />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

const Logo = props => (
  <Link
    to="/"
    activeClassName="active"
    {...props}
  >
    <img src={logo} width="50" alt="Logo" />
  </Link>
);
