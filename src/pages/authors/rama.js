import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Page from '../../components/page';
import { Heading, Column } from '../../components/layout';

// IMPORTANT: Keep in sync with GraphQL query (search for PORTRAIT_SIZE_PX).
const PORTRAIT_SIZE_PX = 210;

export default ({ location, data }) => (
  <Page
    location={location}
    title="About Rama, Dr. Frederick Lenz"
    type="article"
    heading={
      <Column className="col-12 col-lg-auto mx-auto">
        <Heading>Rama, Dr. Frederick Lenz</Heading>
      </Column>
    }
  >
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col-12 col-lg-auto ml-auto">
          <div
            className="mb-3 mx-auto rounded-circle overflow-hidden"
            style={{ width: PORTRAIT_SIZE_PX, height: PORTRAIT_SIZE_PX }}
          >
            <Img className="h-100" {...data.portrait.childImageSharp} />
          </div>
        </div>
        <div className="col-12 mt-3 ml-2 col-lg-8 mt-lg-0 mr-auto">
          <Biography />
        </div>
      </div>
    </div>
  </Page>
);

const SURFING_HIMALAYAS_URL =
  'https://www.amazon.com/Surfing-Himalayas-Frederick-Lenz/dp/0982050593';

const Biography = () => (
  <>
    <p>
      Dr. Frederick Lenz, known as “Rama” to his students and the general
      public, was an enlightened Buddhist teacher who dedicated his life to
      teaching meditation and transmitting the essence of Buddhism so that
      Western practitioners could achieve the highest state of Buddhist
      realization—enlightenment.
    </p>
    <p>
      Rama, Dr. Frederick Lenz was born on February 9, 1950 in San Diego,
      California, and grew up in Connecticut. He had his first experience of
      samadhi—complete immersion in infinite planes of light with no sense of
      self—when he was only three years old. The experience returned when he
      was 19, leading him to his spiritual adventure and transformation in
      Nepal, described in his 1995 best-selling book{' '}
      <a href={SURFING_HIMALAYAS_URL} style={{ color: '#007bff' }}>
        Surfing the Himalayas
      </a>.

      There, he encountered a Tibetan Buddhist monk who predicted that Rama
      would revive an ancient lineage of knowledge and enlightenment and help
      thousands of people.
    </p>
    <p>
      Frederick Lenz graduated Magna Cum Laude from the University of
      Connecticut and he received his MA and Ph.D. in English Literature from
      the State University of New York at Stony Brook. Throughout his
      twenties, Rama continued to deepen his experience of samadhi–no
      thought, endless light, infinite awareness. This continued until
      finally, at age 30, after countless hours of thought-free meditation,
      he became what is termed “enlightened,” meaning that the mind does not
      leave the state of infinite mind, yet one remains active and engaged in
      the world.
    </p>
  </>
);

export const query = graphql`
  {
    portrait: file(
      sourceInstanceName: { eq: "images" }
      relativeDirectory: { eq: "authors" }
      name: { eq: "rama" }
    ) {
      childImageSharp {
        # IMPORTANT: Keep in sync with PORTRAIT_SIZE_PX.
        fixed(width: 210) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
