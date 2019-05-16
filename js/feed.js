import box from "box";

const color = "#00ff00";

export default class feed extends box {
  constructor(threejs, x, y, w, h, d) {
    super(threejs, x, y, w, h, d, color);
  }
  move() {}
}
