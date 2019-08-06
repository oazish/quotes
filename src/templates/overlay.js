import React from 'react';

import Overlay from '../components/overlay';

export default ({ pageContext }) => (
  <Overlay quote={pageContext.quote} />
);
