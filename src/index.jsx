import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    height: '100%',
  },
  img: {
    height: '100%',
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
    };
    this.onDrag = this.onDrag.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    // Once modal is open, prevent background from scrolling
    document.body.style.overflow = 'hidden';
    // prevent dragging behaviour
    window.ondragstart = function() { return false; }
  }

  componentWillUmount() {
    document.body.style.overflow = 'auto';
  }

  onDrag(e){
    if(this.state.dragging){
      this.setState({
        translateX: this.state.dragEndX + e.pageX - this.state.dragStartX,
        translateY: this.state.dragEndY + e.pageY - this.state.dragStartY,
      })
    }
  }

  onDragStart(e){
    this.setState({
      dragging: true,
      dragStartX: e.pageX,
      dragStartY: e.pageY,
    })
  }

  onDragEnd(e){
    const { x, y, width, height } = this.picture.getBoundingClientRect();
    let translateX = this.state.translateX;
    let translateY = this.state.translateY;
    const stageWidth = this.modal.offsetWidth;
    const stageHeight = this.modal.offsetHeight;

    this.setState({
      dragging: false,
      dragEndX: translateX,
      dragEndY: translateY,
      translateX: translateX,
      translateY: translateY,
    })
  }


  render() {
    return (
      <div ref={(elem) => { this.modal = elem; }} style={styles.container}>
        { this.state.imageLoaded ? null : <p>Image Loading</p> }
        <div
          style={styles.imageContainer}
          onMouseMove={this.onDrag}
          onMouseDown={this.onDragStart}
          onMouseUp={this.onDragEnd}
          onMouseLeave={this.onDragEnd}
          ref={(elem) => { this.picture = elem }}
          style={{
            ...styles.imageContainer,
            transform: `translate(${this.state.translateX}px, ${this.state.translateY}px)`
          }}
        >
          <img
            src={this.props.imageSrc}
            onLoad={() => { this.setState({ imageLoaded: true }) }}
            alt={this.props.imageAltText}
            style={styles.img}
          />
        </div>
        <div style={styles.toolbar}>
          <div style={styles.zoomButtonsContainer}>
            <button>Zoom Out</button>
            <button>Zoom In</button>
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
