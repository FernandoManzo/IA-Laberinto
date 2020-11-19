var app = app || {};

app.Agent = Backbone.Model.extend({
  defaults: {
    x: 5,
    y: 5
  },

  initialize: function() {
    app._vent.on("square:setAgentPos", this.setAgentPos, this);
  },

  setAgentPos: function(clickPos) {
    var x = clickPos.get("x");
    var y = clickPos.get("y");
    this.set("x", x);
    this.set("y", y);
  }
});
