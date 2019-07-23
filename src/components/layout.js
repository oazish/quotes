import React from 'react';
import { Link, withPrefix } from 'gatsby';
import { Helmet } from 'react-helmet';

import logo from '../assets/images/logo.png';

export default ({ children }) => (
  <>
    <Helmet
      link={[{
        rel: 'icon',
        type: 'image/x-icon',
        href: withPrefix('/favicon.ico'),
      }]}
    >
      <div className="p-3">
        {children}
      </div>
    </Helmet>
    <Navbar />
    <div className="p-3">{children}</div>
  </>
);

const Navbar = () => (
  <nav
    className="navbar-expand-md navbar-light bg-light pl-3 d-flex flex-wrap"
  >
    <div
      className="align-self-center flex-grow-1 flex-md-grow-0"
      // Setting `flex-basis: 0` perfectly centers logo in collapsed mode.
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
    <Link to="/" className="d-md-none p-1" activeClassName="active">
      <img src={logo} width="50" alt="Logo" />
    </Link>
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
        All Quotes
      </Link>
      <Link
        to="/categories/"
        className="nav-item nav-link"
        activeClassName="active"
      >
        Quote Categories
      </Link>
      <Link
        to="/"
        className="nav-item nav-link d-none d-md-block"
        activeClassName="active"
      >
        <img src={logo} width="50" alt="Logo" />
      </Link>
      <Link
        to="/authors/rama/"
        className="nav-item nav-link"
        activeClassName="active"
      >
        About Rama
      </Link>
      <Link
        to="/collections/"
        className="nav-item nav-link"
        activeClassName="active"
      >
        Collections
      </Link>
    </div>
  </nav>
);