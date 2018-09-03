/* global document, window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  determineStepSize,
  positionWithinRange,
} from './helpers';
import Loader from './Loader';
import Toolbar from './Toolbar';

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 99997,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
  },
  img: {
    maxHeight: '100vh',
    maxWidth: '100vw',
    userSelect: 'none',
    transition: 'opacity 1s',
    opacity: 0,
  },
  loaded: {
    opacity: 1,
  },
};

class ImageCloseup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      dragging: false,
      translateX: 0,
      translateY: 0,
      dragStartX: 0,
      dragStartY: 0,
      dragEndX: 0,
      dragEndY: 0,
      scaleStepSize: 1,
      scale: 1,
      maxScale: 1,
    };
    this.onDrag = this.onDrag.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.onResizeWindow = this.onResizeWindow.bind(this);
  }

  componentDidMount() {
    // Once modal is open, prevent background from scrolling
    document.body.style.overflow = 'hidden';
    // prevent dragging behaviour
    window.ondragstart = () => false;
    window.addEventListener('resize', this.onResizeWindow);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    window.removeEventListener('resize', this.onResizeWindow);
  }

  onDrag(e) {
    if (this.state.dragging) {
      this.setState({
        translateX: (this.state.dragEndX + e.pageX) - this.state.dragStartX,
        translateY: (this.state.dragEndY + e.pageY) - this.state.dragStartY,
      });
    }
  }

  onDragStart(e) {
    this.setState({
      dragging: true,
      dragStartX: e.pageX,
      dragStartY: e.pageY,
    });
  }

  onDragEnd() {
    const {
      width, height,
    } = this.container.getBoundingClientRect();
    const {
      translateX,
      translateY,
    } = this.state;
    const { offsetWidth: stageWidth, offsetHeight: stageHeight } = this.modal;
    this.setState({
      dragging: false,
      dragEndX: positionWithinRange(translateX, width, stageWidth),
      dragEndY: positionWithinRange(translateY, height, stageHeight),
      translateX: positionWithinRange(translateX, width, stageWidth),
      translateY: positionWithinRange(translateY, height, stageHeight),
    });
  }

  onTouchStart(e) {
    this.onDragStart(e.changedTouches[0]);
  }

  onTouchMove(e) {
    this.onDrag(e.changedTouches[0]);
  }

  onTouchEnd(e) {
    this.onDragEnd(e.changedTouches[0]);
  }

  onResizeWindow() {
    const {
      naturalHeight: actualHeight,
      height: scaledHeight,
    } = this.image;
    const {
      width, height,
    } = this.container.getBoundingClientRect();
    const {
      translateX,
      translateY,
    } = this.state;

    const maxScale = actualHeight / scaledHeight;
    const newScale = (this.state.scale / this.state.maxScale) * maxScale;
    const scaleStepSize = determineStepSize(this.props.maxZoomLevels, maxScale);
    const { offsetWidth: stageWidth, offsetHeight: stageHeight } = this.modal;
    this.setState({
      scaleStepSize,
      maxScale,
      scale: newScale,
      dragging: false,
      dragEndX: positionWithinRange(translateX, width, stageWidth),
      dragEndY: positionWithinRange(translateY, height, stageHeight),
      translateX: positionWithinRange(translateX, width, stageWidth),
      translateY: positionWithinRange(translateY, height, stageHeight),
    });
  }

  zoomIn() {
    if (this.state.scale < this.state.maxScale) {
      this.setState({
        scale: Math.min(this.state.scale + this.state.scaleStepSize, this.state.maxScale),
      });
    }
  }

  zoomOut() {
    if (this.state.scale > 0) {
      this.setState({
        scale: Math.max(this.state.scale - this.state.scaleStepSize, 1),
      });
    }
  }

  handleImageLoad() {
    const {
      naturalHeight: actualHeight,
      height: scaledHeight,
    } = this.image;

    const maxScale = actualHeight / scaledHeight;
    const scaleStepSize = determineStepSize(this.props.maxZoomLevels, maxScale);
    this.setState({
      imageLoaded: true,
      scaleStepSize,
      maxScale,
      scale: 1,
    });
  }

  render() {
    return (
      <div ref={(elem) => { this.modal = elem; }} style={styles.container}>
        <Toolbar
          zoomOut={this.zoomOut}
          zoomIn={this.zoomIn}
          closeModal={this.props.closeModalFunc}
          zoomOutDisabled={!this.state.imageLoaded || this.state.scale <= 1}
          zoomInDisabled={!this.state.imageLoaded || this.state.scale >= this.state.maxScale}
        />
        { this.state.imageLoaded ? null : <Loader /> }
        <div
          role="presentation"
          onMouseMove={this.onDrag}
          onMouseDown={this.onDragStart}
          onMouseUp={this.onDragEnd}
          onMouseLeave={this.onDragEnd}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
          ref={(elem) => { this.container = elem; }}
          style={{
            ...styles.imageContainer,
            transform: `translate(${this.state.translateX}px, ${this.state.translateY}px) scale(${
          this.state.scale
            })`,
          }}
        >
          <img
            src={this.props.imageSrc}
            onLoad={this.handleImageLoad}
            alt={this.props.imageAltText}
            ref={(elem) => { this.image = elem; }}
            style={{
              ...styles.img,
              ...(this.state.imageLoaded ? styles.loaded : {}),
            }}
          />
        </div>
      </div>
    );
  }
}

ImageCloseup.defaultProps = {
  imageAltText: 'full-size-image',
  maxZoomLevels: 5,
};

ImageCloseup.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  closeModalFunc: PropTypes.func.isRequired,
  imageAltText: PropTypes.string,
  maxZoomLevels: PropTypes.number,
};

export default ImageCloseup;
