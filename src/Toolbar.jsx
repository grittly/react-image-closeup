import React from 'react';
import PropTypes from 'prop-types';
import css from './styles.css.json';
import {
  CloseIcon,
  MagnifyIcon,
  DemagnifyIcon,
} from './ActionIcons';

const Toolbar = props => (
  <div className={css.toolbar}>
    <div className={css.justifyCenter}>
      <DemagnifyIcon
        onClick={props.zoomOut}
        disabled={props.zoomOutDisabled}
      />
      <MagnifyIcon
        onClick={props.zoomIn}
        disabled={props.zoomInDisabled}
      />
    </div>
    <div className={css.justifyRight}>
      <CloseIcon onClick={props.closeModal} />
    </div>
  </div>
);

Toolbar.propTypes = {
  zoomOut: PropTypes.func.isRequired,
  zoomIn: PropTypes.func.isRequired,
  zoomOutDisabled: PropTypes.bool.isRequired,
  zoomInDisabled: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Toolbar;
