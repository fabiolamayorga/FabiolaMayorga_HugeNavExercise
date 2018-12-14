const path = require('path');

module.exports = {
  entry: {
    app: './public/js/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist/js')
  }
};