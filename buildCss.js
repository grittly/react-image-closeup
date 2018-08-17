const autoprefixer = require('autoprefixer');
// const modules = require('postcss-modules');
const cssnano = require('cssnano');
const postcss = require('postcss');
const postcssImport = require('postcss-import');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, 'dist');
const srcDir = path.resolve(__dirname, 'src');

fs.readFile(path.resolve(srcDir, 'styles.css'), (err, css) => {
  postcss([postcssImport,
    require('postcss-modules')({
      getJSON: function(cssFileName, json, outputFileName){
        var cssName       = path.basename(cssFileName, 'new.css');
        var jsonFileName  = path.resolve(outDir, cssName + '.json');
        fs.writeFileSync(jsonFileName, JSON.stringify(json));
      }
    }),
    autoprefixer, cssnano])
    .process(css, { from: path.resolve(srcDir, 'styles.css'), to: path.resolve(outDir, 'styles.css') })
    .then(result => {
      const jsfile = `export default '${result.css.toString()}';`;
      fs.writeFile(path.resolve(outDir, 'styles.js'), jsfile, () => true);
    });
});
