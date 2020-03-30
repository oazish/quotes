import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

import './src/styles/global.css';

function PageWrapper({ children, location: { pathname: url } }) {
  useEffect(
    () => ReactGA.initialize('UA-158589454-4'),
    [],
  );
  useEffect(
    () => ReactGA.pageview(url),
    [url],
  );
  return children;
}

export function wrapPageElement({ element, props }) {
  return <PageWrapper {...props}>{element}</PageWrapper>;
}
