/* global document, window */
import React from 'react';
import loader from './loader.css';

const styles = {
};

const Loader = () => (
  <div styleName={ 'loader.loader-container'}>
    <div styleName={ 'loader.loader' }>
      <div styleName={ 'loader.box' }></div>
    </div>
  </div>
);

export default Loader;

