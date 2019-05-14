import box from "box";

export default class childBox extends box {
  constructor(threejs, color, parent) {
    super(threejs, parent.x, parent.y, parent.w, parent.h, parent.d, color);
    this.parent = parent;
    this.parentMoveHistory = [];
  }
  move() {
    this.parentMoveHistory.push({ mx: this.parent.mx, my: this.parent.my });
    if (this.parentMoveHistory.length >= 11) {
      this.mx = this.parentMoveHistory[0].mx;
      this.my = this.parentMoveHistory[0].my;
      this.parentMoveHistory.shift();
    }
    this.x += this.mx;
    this.y += this.my;
  }
}
