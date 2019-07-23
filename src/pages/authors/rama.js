import React from 'react';
// import { graphql } from 'gatsby';

import Layout from '../../components/layout';
import picture from '../../assets/images/authors/rama.jpg';

// TODO: Deduplicate common three-column layout between author detail and
//   category detail pages.
export default () => (
  <Layout>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-auto">
          <div
            className="rounded-circle mb-3 mx-auto"
            style={{
              backgroundImage: `url('${picture}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '210px',
              height: '210px',
            }}
          />
          <div className="font-weight-bold text-center">
            Author: Rama, Dr. Frederick Lenz
          </div>
        </div>
        <div className="col-12 mt-3 ml-2 col-lg-8 mt-lg-0">
          <Biography />
        </div>
        <div className="col-2">
        </div>
      </div>
    </div>
  </Layout>
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
      <a href={SURFING_HIMALAYAS_URL}>Surfing the Himalayas</a>.

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

// TODO: Add list of quotes by author when there are multiple authors on site.

// export const query = graphql`
//   {
//     allMarkdownRemark(
//       filter: { frontmatter: { author: { id: { eq: "rama" } } } }
//     ) {
//       nodes {
//         frontmatter {
//           author {
//             name
//           }
//         }
//       }
//     }
//   }
// `;