let keyboard = {
  right: () => {},
  left: () => {},
  up: () => {},
  down: () => {}
};

document.onkeydown = e => {
  let f = {};
  // left
  f["37"] = () => keyboard.left();
  // up
  f["38"] = () => keyboard.up();
  // right
  f["39"] = () => keyboard.right();
  // down
  f["40"] = () => keyboard.down();
  if (f[e.keyCode]) f[e.keyCode]();
};

export default keyboard;
