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
    };
  }

  render() {
    return (
      <div ref={(elem) => { this.modal = elem; }} style={styles.container}>
        <div style={styles.toolbar}>
          <div style={styles.zoomButtonsContainer}>
            <button>Zoom Out</button>
            <button>Zoom In</button>
          </div>
          <div style={styles.closeButtonContainer}>
            <button onClick={this.props.closeModalFunc}>Close</button>
          </div>
        </div>
        { this.state.imageLoaded ? null : <p>Image Loading</p> }
        <div style={styles.imageContainer}>
          <img
            src={this.props.imageSrc}
            onLoad={() => { this.setState({ imageLoaded: true }) }}
            alt={this.props.imageAltText}
            style={styles.img}
          />
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
