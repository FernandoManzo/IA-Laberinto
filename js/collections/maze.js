var app = app || {};

app.Maze = Backbone.Collection.extend({
  model: app.Square
});
