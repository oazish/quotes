import React from 'react';
import { Link, withPrefix } from 'gatsby';
import { Helmet } from 'react-helmet';
import { IoMdSearch } from 'react-icons/io';
import classNames from 'classnames';
import $ from 'jquery';

import logo from '../assets/images/logo.png';

export default class Layout extends React.Component {
  state = { searching: false };

  // TODO(search-ux): When cancelling out of a search and then returning, old
  //   results should be cleared. When clearing search input by backspace and
  //   then typing something, search results prior to empty input should be
  //   preserved.
  render() {
    return (
      <>
        <Helmet
          link={[{
            rel: 'icon',
            type: 'image/x-icon',
            href: withPrefix('/favicon.ico'),
          }]}
        />
        <Navbar
          searching={this.state.searching}
          setSearchState={searching => this.setState({ searching })}
        />
        <div className="p-3">{this.props.children}</div>
      </>
    );
  }
}

const Navbar = ({ searching, setSearchState }) => (
  <nav
    className="
      navbar-expand-md navbar-light bg-light pl-3 d-flex flex-wrap
    "
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
    <Logo className="d-md-none p-1" onClick={() => setSearchState(false)} />
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
        className={classNames({
          'nav-item nav-link': true,
          'flex-grow-1 invisible d-none d-md-block': searching,
        })}
        style={searching ? { flexBasis: 0 } : {}}
        activeClassName="active"
      >
        All Quotes
      </Link>
      <Link
        to="/categories/"
        className={classNames({
          'nav-item nav-link': true,
          'd-none': searching,
        })}
        activeClassName="active"
      >
        Quote Categories
      </Link>
      <Logo
        className="nav-item nav-link d-none d-md-block"
        onClick={() => setSearchState(false)}
      />
      <Link
        to="/authors/rama/"
        className={classNames({
          'nav-item nav-link': true,
          'd-none': searching,
        })}
        activeClassName="active"
      >
        About Rama
      </Link>
      <button
        type="button"
        aria-label="Search"
        className={classNames({
          'd-none': searching,
          'd-flex': !searching,
          'btn btn-link nav-link': true,
        })}
        onClick={() => {
          setSearchState(true);
          // Expand navbar when searching.
          // $('#navbarNav').collapse('show');
          $('#navbarNav').addClass('show');
        }}
      >
        <SearchIcon className="d-none d-md-inline" />
        <span className="d-md-none">Search</span>
      </button>
      {
        // Conditionally render search bar using React rather than CSS so that
        // <input> gets autofocused.
        searching
        ? (
          <SearchBar
            className="
              flex-grow-1 w-auto ml-md-3 my-2 my-md-0 mr-3 align-self-stretch
              align-self-md-auto
            "
            style={{ flexBasis: 0 }}
            onExit={() => setSearchState(false)}
          />
        )
        : null
      }
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

const SearchIcon = props => <IoMdSearch size="22px" {...props} />;

// TODO: Exit on Esc keypress, and focus blur, too.
// TODO: Make sure "X" icon works on iOS, Android, Windows
const SearchBar = ({ onExit, className, ...props }) => {
  const inputRef = React.createRef();

  return (
    <div className={classNames('input-group', className)} {...props}>
      <div className="input-group-prepend">
        <span className="input-group-text">
          <SearchIcon />
        </span>
      </div>
      <input
        ref={inputRef}
        autoFocus={true}
        type="text"
        className="form-control"
        placeholder="Search"
        aria-label="Search"
      />
      <div className="input-group-append">
        <button
          type="button"
          className="btn btn-outline-secondary input-group-text"
          onClick={() => {
            inputRef.current.value = '';
            onExit && onExit();
          }}
        >
          {'\u2715'}
        </button>
      </div>
    </div>
  );
};
