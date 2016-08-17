var React = require('react'),
    _ = require('underscore'),
    AppDispatcher = require('./app_dispatcher'),
    Events = require('./events');

var styles = {
  snapshots: {
    textAlign: 'center'
  },

  snapshot: {
    width: '200px'
  }
};

var SnapshotsContainer = React.createClass({
  getInitialState: function() {
    return {
      snapshots: []
    };
  },

  componentWillMount: function() {
    AppDispatcher.bind(Events.takeSnapshot, function (snapshot) {
      var snapshots = this.state.snapshots;
      snapshots.unshift(snapshot);
      console.log(snapshots);

      this.setState({ snapshots: snapshots });
    }.bind(this));
  },

  render: function() {
    return (
      <div style={ styles.container }>
        <h3>Снимки</h3>

        <div style={ styles.snapshots }>
          { this.getSnapshotsHTML() }
        </div>
      </div>
    );
  },

  getSnapshotsHTML: function () {
    return _.map(this.state.snapshots, function (snapshot, i) {
      return (
        <div key={ i }>
          <img
            src={ snapshot }
            style={ styles.snapshot }
          />
        </div>
      );
    });
  }
});

module.exports = SnapshotsContainer;
