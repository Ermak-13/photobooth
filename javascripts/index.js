var React = require('react'),
    ReactDOM = require('react-dom');

var Camera = require('./camera'),
    SnapshotsContainer = require('./snapshots_container');

global.AppDispatcher = require('./app_dispatcher');

ReactDOM.render(
  React.createElement(Camera, {}),
  document.getElementById('camera-container')
);

ReactDOM.render(
  React.createElement(SnapshotsContainer, {}),
  document.getElementById('snapshots-container')
);
