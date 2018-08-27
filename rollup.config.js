import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.jsx',
  external: ['react', 'react-dom', 'prop-types', 'classnames'],
  plugins: [
    resolve({
      extensions: ['.js', '.json', '.jsx'],
    }),
    postcss({
      plugins: [],
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs(),
  ],
  output: [
    {
      file: 'dist/react_image_closeup.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/react_image_closeup.esm.js',
      format: 'esm',
    },
  ],
};
