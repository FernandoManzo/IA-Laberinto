var app = app || {};

app.Square = Backbone.Model.extend({
  // Types: 'space', 'wall'
  defaults: {
    x: 0,
    y: 0,
    type: "space",
    distance: null,
    active: false
  }
});
