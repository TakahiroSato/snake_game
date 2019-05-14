import movableObject from "movableobject";

export default class box extends movableObject {
  constructor(threejs, x, y, w, h, d, color) {
    super(x, y, w, h, d);
    this.polygon = threejs.drawBox(x, y, w, h, d, color);
  }
  move() {
    super.x += this.mx;
    super.y += this.my;
    super.z += this.mz;
    this.polygon.setPos(this.x, this.y, this.z);
  }
  get x() {
    return super.x;
  }
  get y() {
    return super.y;
  }
  get z() {
    return super.z;
  }
  set x(v) {
    super.x = v;
    this.polygon.setPos(this.x, this.y, this.z);
  }
  set y(v) {
    super.y = v;
    this.polygon.setPos(this.x, this.y, this.z);
  }
  set z(v) {
    super.z = v;
    this.polygon.setPos(this.z, this.y, this.z);
  }
}
