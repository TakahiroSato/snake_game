import box from "box";
import settings from "./settings";

export default class childBox extends box {
  constructor(threejs, color, parent) {
    super(threejs, parent.x, parent.y, parent.w, parent.h, parent.d, color);
    this.parent = parent;
    this.parentMoveHistory = [];
    this._dummy = null;
    this.dummyCnt = 0;
    this.hasChild = false;
    parent.hasChild = true;
  }
  get dummy() {
    return this._dummy;
  }
  set dummy(v) {
    if (this._dummy) {
      this._dummy.death();
    }
    this._dummy = v;
  }
  move() {
    this.parentMoveHistory.push({ mx: this.parent.mx, my: this.parent.my });
    if (
      this.parentMoveHistory.length >
      Math.floor(settings.cellWidth / settings.moveSpeed)
    ) {
      if (
        this.hasChild &&
        this.mx !== this.parentMoveHistory[0].mx &&
        this.my !== this.parentMoveHistory[0].my
      ) {
        this.dummy = new childBox(this.threejs, this.color, this);
      }
      this.mx = this.parentMoveHistory[0].mx;
      this.my = this.parentMoveHistory[0].my;
      this.parentMoveHistory.shift();
    }
    this.x += this.mx;
    this.y += this.my;
    if (this.dummy) {
      this.dummyCnt += 1;
      if (
        this.dummyCnt >= Math.floor(settings.cellWidth / settings.moveSpeed)
      ) {
        this.dummy = null;
        this.dummyCnt = 0;
      }
    }
  }
}
