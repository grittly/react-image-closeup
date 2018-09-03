# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- allow panning on mobile using touch

### Fixed
- image's alt text was showing up before image was loaded. Changed default opacity to 0.

## [1.0.0] - 2018-08-28
### Added
- Babel plugin `babel-plugin-react-css-modules` to automatically convert `styleName` to `className` using the correct css module, in both webpack and rollup builds
- `rollup.standalone.config` to generate standalone component bundle that can be injected into a `<script>` tag
- using `rollup-plugin-terser` to minify because it supports es6 modules
- added a build for the package as es6 modules (`modules` field in package.json) and as commonjs modules (`main` field in package.json)

### Changed
- Changed module bundling from custom babel and postcss scripts to rollup.js bundling. Rollup uses postcss config to add css-modules, minify, and autoprefix.
- webpack demo page now imports the component directly, instead of using the built one inside the `dist/` folder

### Removed
- `chokidar`, `concurrenty`, `postcss-import` from devDependencies because using Rollup now
- removed `buildCss.js` script because using Rollup to run `postcss` processing now
