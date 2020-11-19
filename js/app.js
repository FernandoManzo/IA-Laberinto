var app = app || {};

app.boot = function() {
  app.width = 10;

  app.height = 10;

  app.editState = "maze"; // or 'agent' or 'goal'

  app._vent = _.extend({}, Backbone.Events);

  app.squares = [];

  for (var y = 0; y < app.height; y++) {
    for (var x = 0; x < app.width; x++) {
      app.squares.push({ x: x, y: y });
    }
  }

  app.mazeView = new app.MazeView();

  $("#maze").append(app.mazeView.el);

  // Agent:
  app.agentModel = new app.Agent();
  app.agentView = new app.AgentView({ model: app.agentModel });

  // Goal:
  app.goalModel = new app.Goal();
  app.goalView = new app.GoalView({ model: app.goalModel });

  // Controls:
  new app.ControlsView();
};
