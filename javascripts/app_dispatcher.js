var MicroEvent = require('./microevent'),
    Events = require('./events');

var AppDispatcher = function () {
  this.takeSnapshot = function (snapshot) {
    this.trigger(Events.takeSnapshot, snapshot);
  };
};
MicroEvent.mixin(AppDispatcher);

module.exports = new AppDispatcher();
