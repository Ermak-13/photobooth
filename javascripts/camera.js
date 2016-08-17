var React = require('react'),
    _ = require('underscore'),
    moment = require('moment'),
    sprintf = require('sprintf-js').sprintf,
    Webcam = require('webcamjs');

var styles = {
  camera_container: {
    background: '#000',
    maxWidth: '580px',
    margin: 'auto',
    borderRadius: '5px',
  },

  camera: {
    float: 'left',
    margin: '10px 15px'
  },

  camera_panel: {
    float: 'left',
    margin: '10px 15px'
  },

  snapshots: {
    width: '200px',
    height: '150px',
    border: 'dashed 2px',
    marginTop: '10px'
  },

  controls: {
    height: '40px'
  }
};

var PhotoField = React.createClass({
  getInitialState: function() {
    return {
      value: null
    };
  },

  takeSnapshot: function (e) {
    e.preventDefault();

    Webcam.snap(function (data_uri) {
      this.setState({
        value: data_uri
      });
    }.bind(this));
  },

  getLastSnapshot: function () {
    var value = this.state.value;

    if (value) {
      return (
        <img src={ value } style={{ width: '100%' }}/>
      );
    }
  },

  componentDidMount: function() {
    Webcam.set({
      width: 320,
      height: 240
    });
    Webcam.attach('#camera');
  },

  componentWillUnmount: function() {
    Webcam.reset();
  },

  render: function() {
    return (
      <div className="form-group">
        <div style={ styles.camera_container }>
          <div id="camera" style={ styles.camera } />

          <div style={ styles.camera_panel }>
            <div style={ styles.controls }>
              <a href="#" className="btn btn-primary width-100p" onClick={ this.takeSnapshot }>
                Сделать фото
              </a>
            </div>

            <div style={ styles.snapshots }>
              { this.getLastSnapshot() }
            </div>
          </div>

          <div className="clearfix" />
        </div>
      </div>
    );
  }
});

module.exports = PhotoField;
