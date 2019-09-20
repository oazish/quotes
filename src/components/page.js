import React from 'react';
import { Link, withPrefix } from 'gatsby';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';

import { SEARCH_MODAL_ID, SearchModal, SearchIcon } from './search';
import { Background } from './layout';
import logo from '../assets/images/logo.png';
import { useAbsoluteUrl } from '../utils/misc';
import styles from '../styles/page.module.css';

export default ({
  background = <Background />,
  heading,
  location,
  image,
  full = false,
  children,
  className,
  ...remainingProps,
}) => {
  const backgroundWrapper = (
    <aside className={styles.background}>
      {background}
    </aside>
  );
  return (
    <>
      <Head
        url={useAbsoluteUrl(location.pathname)}
        image={useAbsoluteUrl(image)}
        {...remainingProps}
      />
      <main className={classNames({ [styles.full]: full }, className)}>
        {
          // If page background is full-screen, render it within main element.
          full && backgroundWrapper
        }
        <header className={styles.header}>
          {
            // If page background is not full-screen, render it within header
            // element, limiting its size.
            !full && backgroundWrapper
          }
          <Navbar />
          {heading}
        </header>
        <article>
          {children}
        </article>
        <SearchModal />
      </main>
    </>
  );
};

const Navbar = () => (
  <nav
    className="navbar-expand-md navbar-dark pl-2 pl-md-0 d-flex flex-wrap"
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
        style={{ border: '1px solid rgba(255, 255, 255, 0.25)' }}
      >
        <span className="navbar-toggler-icon" />
      </button>
    </div>
    <Logo className="nav-item nav-link d-md-none p-1" />
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
        data-target={`#${SEARCH_MODAL_ID}`}
        data-toggle="modal"
      >
        <SearchIcon className="d-none d-md-inline" />
        <span className="d-md-none">Search</span>
      </button>
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

const Head = ({
  url,
  title,
  description,
  image,
  imageWidth,
  imageHeight,
  type = 'website',
}) => {
  const metaTags = {
    description,
    // OpenGraph tags for Facebook sharing.
    'og:type': type,
    'og:url': url,
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:image:width': imageWidth,
    'og:image:height': imageHeight,
  };
  return (
    <Helmet>
      <title>{title}</title>
      <link
        rel="icon"
        type="image/x-icon"
        href={withPrefix('/favicon.ico')}
      />
      {
        Object.entries(metaTags).map(([name, content]) =>
          content
            ? (
              // Use `name` and `property` attributes so that social platform
              // scrapers (ahem, Facebook!) don't complain.
              <meta key={name} name={name} property={name} content={content} />
            )
            : null,
          )
      }
    </Helmet>
  );
};
