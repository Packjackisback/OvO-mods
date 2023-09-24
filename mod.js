function getLayout(layoutName) {
    return cr_getC2Runtime().layouts[layoutName] || cr_getC2Runtime().running_layout;
}

setInterval(function() {
  var layout = getLayout();
  if (layout.name == "Level 41") {
    c2_callFunction("Menu > EndGame", []);
  }
}, 16);
