var React = require('react'),
    ReactDOM = require('react-dom');

var Camera = require('./camera');

ReactDOM.render(
  React.createElement(Camera, {}),
  document.getElementById('camera-container')
);
