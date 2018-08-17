/* global document, window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  determineStepSize,
  positionWithinRange,
} from './helpers';
import Loader from './Loader';
import cssStyles from './styles';

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 10000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  imageContainer: {
  },
  img: {
    maxHeight: '100vh',
    maxWidth: '100vw',
  },
};

const CONFIG = {
  maxZoomLevels: 5,
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
    // Inject css
    let tag = document.createElement('style');
    tag.id = 'react-image-closeup';
    tag.innerHTML = cssStyles;
    document.getElementsByTagName('head')[0].appendChild(tag);
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
    const scaleStepSize = determineStepSize(CONFIG.maxZoomLevels, maxScale);
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
    const scaleStepSize = determineStepSize(CONFIG.maxZoomLevels, maxScale);
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
      <Loader />
      { this.state.imageLoaded ? null : <p>Image Loading</p> }
      <div
        role="presentation"
        onMouseMove={this.onDrag}
        onMouseDown={this.onDragStart}
      onMouseUp={this.onDragEnd}
      onMouseLeave={this.onDragEnd}
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
      style={styles.img}
    />
  </div>
      <div style={styles.toolbar}>
        <div style={styles.zoomButtonsContainer}>
          <button
      onClick={this.zoomOut}
      disabled={this.state.scale <= 0}
    >
      Zoom Out
    </button>
    <button
      onClick={this.zoomIn}
      disabled={this.state.scale >= this.state.maxScale}
    >
      Zoom In
    </button>
  </div>
      <div style={styles.closeButtonContainer}>
        <button onClick={this.props.closeModalFunc}>Close</button>
      </div>
      </div>
    </div>
    );
  }
  }

ImageCloseup.defaultProps = {
  imageAltText: 'full-size-image',
};

ImageCloseup.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  closeModalFunc: PropTypes.func.isRequired,
  imageAltText: PropTypes.string,
};

export default ImageCloseup;
