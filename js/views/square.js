var app = app || {};

app.SquareView = Backbone.View.extend({
  tagName: "div",
  className: "square",
  template: _.template($("#squareTemplate").html()),

  events: {
    click: "toggleSquare"
  },

  initialize: function() {
    this.model.on("change", _.bind(this.render, this));
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    var left = this.model.get("x") * 50;
    var top = this.model.get("y") * 50;
    this.$el.css("left", left);
    this.$el.css("top", top);
    if (this.model.get("active")) {
      this.$el.addClass("active");
    } else {
      this.$el.removeClass("active");
    }
    return this;
  },

  toggleSquare: function() {
    if (app.editState == "maze") {
      var type = this.model.get("type");
      if (type == "space") {
        type = "wall";
      } else {
        type = "space";
      }
      this.model.set("type", type);
      if (type == "space") {
        this.$el.addClass("space");
        this.$el.removeClass("wall");
      } else {
        this.$el.addClass("wall");
        this.$el.removeClass("space");
      }
    } else if (app.editState == "agent") {
      app._vent.trigger("square:setAgentPos", this.model);
    } else if (app.editState == "goal") {
      app._vent.trigger("square:setGoalPos", this.model);
    }
  }
});
