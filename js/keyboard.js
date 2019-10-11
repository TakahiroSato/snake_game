let keyboard = {
  p: () => {},
  esc: () => {},
  right: () => {},
  left: () => {},
  up: () => {},
  down: () => {}
};

document.onkeydown = e => {
  let f = {};
  const prevent = func => {
    func();
    e.preventDefault();
  }
  // p
  f["80"] = () => keyboard.p();
  // escape
  f["27"] = () => keyboard.esc();
  // left
  f["37"] = () => prevent(keyboard.left);
  // up
  f["38"] = () => prevent(keyboard.up);
  // right
  f["39"] = () => prevent(keyboard.right);
  // down
  f["40"] = () => prevent(keyboard.down);
  if (f[e.keyCode]) f[e.keyCode]();
};

export default keyboard;
