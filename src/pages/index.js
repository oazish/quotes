import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import classNames from 'classnames';

import Page from '../components/page';
import { Column } from '../components/layout';
import { SEARCH_MODAL_ID, SearchIcon } from '../components/search';
import styles from '../styles/index.module.css';

const COLUMN_CLASSNAME = 'col-sm mx-auto text-center';

export default ({ location, data }) => (
  <Page
    location={location}
    title="Buddha Quotes"
    full={true}
    heading={
      <Column className={classNames(COLUMN_CLASSNAME, styles.heading)}>
        <h1>Buddha Quotes</h1>
        <span>
          Essential quotes &amp; truth from buddhas and beings of the
          Vajrayana path
        </span>
      </Column>
    }
    background={
      <Img className="h-100" {...data.splash.childImageSharp} />
    }
  >
    <Column className={COLUMN_CLASSNAME}>
      <section className={styles.search}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            aria-label="Search"
            data-target={`#${SEARCH_MODAL_ID}`}
            data-toggle="modal"
            readOnly
          />
          <div className="input-group-append">
            <span className="input-group-text">
              <SearchIcon />
            </span>
          </div>
        </div>
      </section>
    </Column>
  </Page>
);

export const query = graphql`
  {
    splash: file(
      sourceInstanceName: { eq: "images" }
      relativeDirectory: { eq: "" }
      name: { eq: "home" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
