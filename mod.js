setInterval(function() {
  var layout = ovoModAPI.game.getLayout();
  if (layout.name == "Level 41") {
    c2_callFunction("Menu > EndGame", []);
  }
}, 100);
