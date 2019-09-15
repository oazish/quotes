import React from 'react';
import classNames from 'classnames';
import { MdShare } from 'react-icons/md';

import { useAbsoluteUrl } from '../utils/misc';
import styles from '../styles/share-button.module.css';

export default ({ shareUrl, className, style }) => {
  const absoluteShareUrl = useAbsoluteUrl(shareUrl);

  return (
    <button
      className={classNames('btn btn-link', styles.button, className)}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        window.open(
          'https://www.facebook.com/sharer/sharer.php?u=' +
            window.encodeURIComponent(absoluteShareUrl),
          'pop',
          'width=600, height=400, scrollbars=no',
        );
      }}
      style={style}
    >
      <MdShare size="24px" />
    </button>
  );
};
