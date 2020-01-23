import React from 'react';
import classNames from 'classnames';

import styles from '../styles/layout.module.css';

export const Background = ({ className, ...rest }) => (
  <div className={classNames(styles.background, className)} {...rest} />
);

export const Heading = ({ children }) => (
  <div className={styles.heading}>
    <h1>{children}</h1>
  </div>
);

export const Column = ({
  containerFluid = true,
  className,
  children,
  ...rest
}) => (
  <div className={containerFluid ? 'container-fluid' : 'container'}>
    <div className="row">
      <div className={className} {...rest}>
        {children}
      </div>
    </div>
  </div>
);
