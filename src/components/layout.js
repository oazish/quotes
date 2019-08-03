import React from 'react';
import { Link, withPrefix } from 'gatsby';
import { Helmet } from 'react-helmet';

import { Search, SearchIcon } from './search';
import logo from '../assets/images/logo.png';

export default ({ children }) => (
  <>
    <Helmet
      link={[{
        rel: 'icon',
        type: 'image/x-icon',
        href: withPrefix('/favicon.ico'),
      }]}
    />
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
        All Quotes
      </Link>
      <Link
        to="/topics/"
        className="nav-item nav-link"
        activeClassName="active"
      >
        Quote Topics
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
