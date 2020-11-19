var app = app || {};

app.ControlsView = Backbone.View.extend({
  el: $("#controls"),

  events: {
    "click .stateButton": "setState",
    "click .findPath": "findPath",
    "click .clearPath": "clearPath",
    "click .clearMaze": "clearMaze"
  },

  setState: function(e) {
    var state = e.currentTarget.id.replace("_btn", "");
    app.editState = state;
  },

  findPath: function() {
    app._vent.trigger("controls:findPath");
  },

  clearPath: function() {
    app._vent.trigger("controls:clearPath");
  },

  clearMaze: function() {
    app._vent.trigger("controls:clearMaze");
  }
});
