var app = app || {};

app.Goal = Backbone.Model.extend({
  defaults: {
    x: 9,
    y: 9
  },

  initialize: function() {
    app._vent.on("square:setGoalPos", this.setGoalPos, this);
  },

  setGoalPos: function(clickPos) {
    var x = clickPos.get("x");
    var y = clickPos.get("y");
    this.set("x", x);
    this.set("y", y);
  }
});
