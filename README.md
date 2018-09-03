# react-image-closeup
This a lightweight component for displaying a single image in a fullscreen lightbox. Comes with magnfication capabilities. 

**Features**:
- Open up a full-sized image in full-screen modal
- Zoom In/Zoom out and drag it around
- Specify number of magnification steps
- Uses css animations

## Demo
Here is a [Demo](https://grittly.github.io/react-image-closeup/) of the component in action!

## Installation

**npm**

```
npm install react-image-closeup --save
```

**standalone**

You can load the standalone version of the component from `node_modules/standalone/react_image_closeup.production.min.js` or via CDN `https://unpkg.com/react-image-closeup`. The package requires `react`, `react-dom` and `prop-types`.

```html
<script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/prop-types@15.6/prop-types.min.js"></script>
<script src="https://unpkg.com/react-image-closeup"></script>
<script>
  // Your code here
</script>
```

To see a full example, check out this [CodePen](https://codepen.io/grittly/pen/aaWqQY)

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
