# react-image-closeup
While there are plenty of react components out there for displaying full size images inside a modal, a lot of them are for full-on galleries. If you want a lightweight simple component for displaying a simple image and being able to zoom in on it, give this package a try! 

**Features**:
- Open up a full-sized image in full-screen modal
- Zoom In/Zoom out and drag it around
- Specify number of magnification steps

## Demo
Here is a [Demo](https://grittly.github.io/react-image-closeup/) of the component in action!

## Installation

**npm**
```
npm install react-image-closeup --save
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
