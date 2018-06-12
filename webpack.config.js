/*
* @Author: JoseMunoz
* @Date:   2018-06-10 21:22:06
* @Last Modified by:   JoseMunoz
* @Last Modified time: 2018-06-12 10:42:15
*/
const path = require('path');

module.exports = {
	module:{
		rules:[
			{
				test: /\.(js|jsx)$/,
        exclude: /node_modules/,
				include: path.join(__dirname, 'src'),
        loader: ['babel-loader', 'eslint-loader'],
			}
		]
	},
  externals:['lodash'],
  resolve: {
    extensions: ['.js', '.jsx']
  },
	output: {
		libraryTarget: 'umd',
    library: 'ReactGradientContainer',
		filename: 'ReactGradientContainer.js',
		path: path.join(__dirname, 'dist')
	}
}
