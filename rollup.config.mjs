import commonjs from '@rollup/plugin-commonjs';
//import resolve from '@rollup/plugin-node-resolve';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
//import fs from 'fs';
//import path from 'path';
import pkg from './package.json' with { type: 'json' };


const reservedNames = [
  // uppercase classes
  'Point', 'Line', 'Square', 'Cube', 'Polygon', 'Sphere', 'Group',
  'Tube', 'Surface', 'Prism', 'Cylinder', 'Cone', 'Pyramid',
  'Circle', 'Convex', 'Extrude', 'Model', 'Construct', 'Text3D', 'Capture',
  // lowercase functional wrappers (very important for your case)
  'point', 'line', 'square', 'cube', 'group', 'tube', 'surface',
  'prism', 'cylinder', 'cone', 'pyramid', 'circle', 'convex',
  'extrude', 'model', 'construct', 'text3d', 'capture'
];

const terserOptions = {
  keep_classnames: true,
  keep_fnames: true,                    // helps with both functions and classes
  mangle: {
    keep_classnames: true,
    keep_fnames: true,
    reserved: reservedNames,
    properties: false,                  // prevents mangling that can break class references
    toplevel: false
  }
};


export default [

	{
		input: './src/suica.js',
		output: {
			file: './dist/suica.js',
			format: 'umd',
			name: 'Suica',
			exports: 'named',
			banner: `// suica v${pkg.version}\n\n\n`,
		},
		external: [
		],
		plugins: [
			nodeResolve(), // Resolves node_modules dependencies like 'three'
			commonjs(), // Converts UMD/CommonJS to ES Modules
		],
  },

	{
		input: './src/suica.js',
		output: {
			file: './dist/suica.min.js',
			format: 'umd',
			name: 'Suica',                    // ← critical for UMD
			exports: 'named',
			banner: `/* suica v${pkg.version}*/\n\n\n`,
		},
		external: [
		],
		plugins: [
			nodeResolve(), // Resolves node_modules dependencies like 'three'
			commonjs(), // Converts UMD/CommonJS to ES Modules
			//terser({mangle:!false}), // Minify
			terser(terserOptions),
		],
  },

];
