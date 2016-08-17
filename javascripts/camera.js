var React = require('react'),
    _ = require('underscore'),
    moment = require('moment'),
    sprintf = require('sprintf-js').sprintf,
    Webcam = require('webcamjs'),

    AppDispatcher = require('./app_dispatcher');

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

  label: {
    color: 'white'
  },

  submit: {
    width: '100%'
  }
};

var PhotoField = React.createClass({
  getInitialState: function() {
    return {
      value: null,

      processing: false,
      delay: 1000,
      intervalId: null
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();

    if (this.state.processing) {
      this.stop();
    } else {
      this.start();
    }
  },

  handleChangeDelay: function (e) {
    this.setState({ delay: e.target.value });
  },

  start: function () {
    intervalId = setInterval(
      this.takeSnapshot,
      this.state.delay
    );

    this.setState({
      processing: true,
      intervalId: intervalId
    });
  },

  stop: function () {
    clearInterval(this.state.intervalId);
    this.setState({
      processing: false,
      intervalId: null
    })
  },

  takeSnapshot: function () {
    Webcam.snap(function (value) {
      this.setState({
        value: value
      });

      AppDispatcher.takeSnapshot(value);
    }.bind(this));

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
            <form onSubmit={ this.handleSubmit }>
              <div className="form-group">
                <label 
                  className="text-justify"
                  style={ styles.label }>
                  Делать снимки каждые:
                </label>

                <input type="text"
                  className="form-control"
                  value={ this.state.delay }
                  onChange={ this.handleChangeDelay }
                />
              </div>

              { this.getSubmitHTML() }
            </form>
          </div>

          <div className="clearfix" />
        </div>
      </div>
    );
  },

  getSubmitHTML: function () {
    if (this.state.processing) {
      return (
        <input type="submit"
          className="btn btn-danger"
          style={ styles.submit }
          value="Остановить"
        />
      );
    } else {
      return (
        <input type="submit"
          className="btn btn-success"
          style={ styles.submit }
          value="Начать"
        />
      );
    }
  }
});

module.exports = PhotoField;
