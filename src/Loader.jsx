/* global document, window */
import React from 'react';
import css from './styles.css.json';

const styles = {
};

const Loader = () => (
  <div className={ css['loader-container'] }>
    <div className={ css.loader }>
      <div className={ css.box }></div>
    </div>
  </div>
);

export default Loader;

