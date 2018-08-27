import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.jsx',
  external: ['react', 'react-dom', 'prop-types'],
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
    terser({
      output: {
        comments: (node, comment) => {
          const { value: text, type } = comment;
          if (type === 'comment2') {
            // 'comment2' is multiline comments
            return /@preserve|@license|@cc_on|copyright/i.test(text);
          }
          return false;
        },
      },
    }),
  ],
  output: {
    file: 'dist/standalone/react-image-closeup.production.min.js',
    format: 'umd',
    name: 'ReactImageCloseup',
    globals: {
      react: 'React',
      'prop-types': 'PropTypes',
    },
  },
};
