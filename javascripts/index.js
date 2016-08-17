var React = require('react'),
    ReactDOM = require('react-dom');

var Camera = require('./camera');

global.AppDispatcher = require('./app_dispatcher');

ReactDOM.render(
  React.createElement(Camera, {}),
  document.getElementById('camera-container')
);
