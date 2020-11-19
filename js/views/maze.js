var app = app || {};

app.MazeView = Backbone.View.extend({
  tagName: "div",
  className: "maze",
  template: _.template($("#mazeTemplate").html()),
  queue: [],

  initialize: function() {
    this.collection = new app.Maze(app.squares);
    this.$el.html(this.template());
    this.render();
    app._vent.on("controls:findPath", this.startPathFind, this);
    app._vent.on("controls:clearPath", this.clearPath, this);
    app._vent.on("controls:clearMaze", this.clearMaze, this);
  },

  render: function() {
    this.collection.each(function(model) {
      this.renderSquare(model);
    }, this);
  },

  clearPath: function() {
    this.queue = [];
    this.collection.each(function(model) {
      model.set("distance", null);
      model.set("active", false);
    });
  },

  clearMaze: function() {
    this.queue = [];
    this.collection = new app.Maze(app.squares);
    this.$el.html(this.template());
    this.render();
  },

  renderSquare: function(item) {
    var squareView = new app.SquareView({
      model: item
    });
    this.$el.append(squareView.render().el);
  },

  startPathFind: function() {
    var goal_x = app.goalModel.get("x");
    var goal_y = app.goalModel.get("y");
    var square = this.getSquareAt(goal_x, goal_y);
    square.set("distance", 0);
    this.queue.push(square);
    this.findPath();
    var movements = this.createRoute();
    console.log(movements);
  },

  findPath: function() {
    var self = this;

    while (this.queue.length > 0) {
      // dequeue:
      var oldestSquare = this.queue.pop();

      var reachedAgent =
        oldestSquare.get("x") == app.agentModel.get("x") &&
        oldestSquare.get("y") == app.agentModel.get("y");

      if (!reachedAgent) {
        var oldDistance = oldestSquare.get("distance");
        var newDistance = oldDistance + 1;

        // enqueue adjacent steps:
        var adjacentSquares = this.getAdjacent(
          oldestSquare.get("x"),
          oldestSquare.get("y")
        );
        adjacentSquares.forEach(function(adjSq) {
          var adjacentSquare = self.getSquareAt(adjSq.x, adjSq.y);
          if (adjacentSquare.get("distance") == null) {
            adjacentSquare.set("distance", newDistance);
            self.queue.unshift(adjacentSquare);
          }
        });
      }
    }
  },

  getSquareAt: function(x, y) {
    return this.collection.findWhere({ x: x, y: y });
  },

  getAdjacent: function(x, y) {
    var adjacent = [];
    if (x > 0 && !this.isWall(x - 1, y)) {
      adjacent.push({ x: x - 1, y: y });
    }
    if (x < app.width - 1 && !this.isWall(x + 1, y)) {
      adjacent.push({ x: x + 1, y: y });
    }
    if (y > 0 && !this.isWall(x, y - 1)) {
      adjacent.push({ x: x, y: y - 1 });
    }
    if (y < app.height - 1 && !this.isWall(x, y + 1)) {
      adjacent.push({ x: x, y: y + 1 });
    }
    return adjacent;
  },

  isWall: function(x, y) {
    var square = app.mazeView.collection.findWhere({ x: x, y: y });
    return square.get("type") == "wall";
  },

  createRoute: function() {
    var movements = [];
    var old_x = app.agentModel.get("x");
    var old_y = app.agentModel.get("y");
    // get distance value at start square:
    var square = this.getSquareAt(old_x, old_y);
    while (square.get("distance") > 0) {
      square = this.findSquare(square);
      square.set("active", true);
      var movement = this.getMovement(
        old_x,
        old_y,
        square.get("x"),
        square.get("y")
      );
      movements.push(movement);
      old_x = square.get("x");
      old_y = square.get("y");
    }
    return movements;
  },

  findSquare: function(prevSquare) {
    var self = this;
    var adjacent = this.getAdjacent(prevSquare.get("x"), prevSquare.get("y"));
    for (var i = 0; i < adjacent.length; i++) {
      var adjSq = adjacent[i];
      var adjacentSquare = self.getSquareAt(adjSq.x, adjSq.y);
      if (adjacentSquare.get("distance") == prevSquare.get("distance") - 1) {
        return adjacentSquare;
      }
    }
  },

  getMovement: function(x1, y1, x2, y2) {
    if (x2 > x1) {
      return "right";
    }
    if (x2 < x1) {
      return "left";
    }
    if (y2 > y1) {
      return "down";
    }
    if (y2 < y1) {
      return "up";
    }
  }
});
