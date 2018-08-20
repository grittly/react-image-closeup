import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import css from './styles.css.json';

export const CloseIcon = props => (
  <div
    onClick={props.onClick}
  >
    <svg viewBox="0 0 64 64" className={css.iconContainer}>
      <g className={css.icon}>
        <g transform="rotate(45 32 32)">
          <rect width="3em" height="16" x="8" y="24" rx="7%" ry="7%" />
          <rect width="3em" height="16" x="8" y="24" rx="7%" ry="7%" transform="rotate(90 32 32)" />
        </g>
      </g>
    </svg>
  </div>
);

CloseIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export const MagnifyIcon = props => (
  <div
    onClick={props.disabled ? () => {} : props.onClick}
  >
    <svg
      viewBox="0 0 64 64"
      className={classnames(
      css.iconContainer,
      { [css.disabled]: props.disabled },
      )}
    >
      <g className={css.icon}>
        <g>
          <rect width="3em" height="16" x="8" y="24" rx="7%" ry="7%" />
          <rect width="3em" height="16" x="8" y="24" rx="7%" ry="7%" transform="rotate(90 32 32)" />
        </g>
      </g>
    </svg>
  </div>
);

MagnifyIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export const DemagnifyIcon = props => (
  <div
    onClick={props.onClick}
  >
    <svg
      viewBox="0 0 64 64"
      className={classnames(
      css.iconContainer,
      { [css.disabled]: props.disabled },
      )}
    >
      <g className={css.icon}>
        <g>
          <rect width="3em" height="16" x="8" y="24" rx="7%" ry="7%" />
        </g>
      </g>
    </svg>
  </div>
);

DemagnifyIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
