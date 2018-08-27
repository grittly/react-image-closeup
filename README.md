# react-image-closeup
This a lightweight component for displaying a single image in a fullscreen lightbox. Comes with magnfication capabilities. 

**Features**:
- Open up a full-sized image in full-screen modal
- Zoom In/Zoom out and drag it around
- Specify number of magnification steps
- Uses css animations
- Uses [css modules](https://github.com/css-modules/css-modules) to harmlessly inject css so it doesn't interfere with existing styles

## Demo
Here is a [Demo](https://grittly.github.io/react-image-closeup/) of the component in action!

## Installation

**npm**
```
npm install react-image-closeup --save
```

## Usage
```javascript
import React, { Component } from 'react';
import ReactImageCloseup from 'react-image-closeup';

class SampleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    }
  }

  render() {
    return (
      <div>
        {
          this.state.modalOpen ?
            <ReactImageCloseup
              closeModalFunc={() => { this.setState({modalOpen: false}); }}
              imageSrc="http://via.placeholder.com/2000x2000"
            /> :
            null
        }
        <button
          onClick={() => { this.setState({modalOpen: true}); }}
        >
          Open Image
        </button>
      </div>
    )
  }
}
```

## Props
Property | Type | Required | Default value | Description
:-- | :-- | :-- | :-- | :-- 
imageSrc | String | Yes |  | Path to full size image
imageAltText | String | | 'full-size-image' | `alt` value for the full size `<img>` being loaded
maxZoomLevels | Number | | 5 | Max number of zoom levels. Each zoom level will increase magnification of the image by a minimum scale of 1
closeModalFunc | Function | Yes | | Callback function for pressing the close button once modal is full-screen

## Versioning
[SemVer](https://semver.org/) standards are used for versioning
