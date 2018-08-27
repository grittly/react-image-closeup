import React from 'react';
import PropTypes from 'prop-types';
import actionIcons from './actionIcons.css';
import {
  CloseIcon,
  MagnifyIcon,
  DemagnifyIcon,
} from './ActionIcons';

const Toolbar = props => (
  <div styleName={'actionIcons.toolbar'}>
    <div styleName={'actionIcons.justifyCenter'}>
      <DemagnifyIcon
        onClick={props.zoomOut}
        disabled={props.zoomOutDisabled}
      />
      <MagnifyIcon
        onClick={props.zoomIn}
        disabled={props.zoomInDisabled}
      />
    </div>
    <div styleName={'actionIcons.justifyRight'}>
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
