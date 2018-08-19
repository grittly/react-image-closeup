/* global document, window */
import React from 'react';
import css from './styles.css.json';

const styles = {
};

export const CloseIcon = (props) => (
  <div
    onClick={props.onClick}
    disabled={props.disabled}
  >
    <svg viewBox="0 0 64 64" className={css.iconContainer}

    >
      <g className={css.icon}>
        <g transform="rotate(45 32 32)">
          <rect width="3em" height="16" x="8" y="24" rx="7%" ry="7%" />
          <rect width="3em" height="16" x="8" y="24" rx="7%" ry="7%" transform="rotate(90 32 32)"/>
        </g>
      </g>
    </svg>
  </div>
);


