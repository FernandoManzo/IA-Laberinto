var app = app || {};

app.AgentView = Backbone.View.extend({
  el: $(".agent"),

  initialize: function() {
    this.render();
    this.model.on("change", _.bind(this.render, this));
  },

  render: function() {
    var left = this.model.get("x") * 50;
    var top = this.model.get("y") * 50;
    this.$el.css("left", left);
    this.$el.css("top", top);
    return this;
  }
});
