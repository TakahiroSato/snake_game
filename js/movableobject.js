export default class movableObject {
  constructor(x, y, w, h, d) {
    this._x = x;
    this._y = y;
    this._z = 0;
    this._w = w;
    this._h = h;
    this._d = d;
    this._mx = 0;
    this._my = 0;
    this._mz = 0;
    this._rx = 0;
    this._ry = 0;
    this._rz = 0;
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get z() {
    return this._z;
  }
  get w() {
    return this._w;
  }
  get h() {
    return this._h;
  }
  get d() {
    return this._d;
  }
  get mx() {
    return this._mx;
  }
  get my() {
    return this._my;
  }
  get mz() {
    return this._mz;
  }
  get rx() {
    return this._rx;
  }
  get ry() {
    return this._ry;
  }
  get rz() {
    return this._rz;
  }
  set x(v) {
    this._x = v;
  }
  set y(v) {
    this._y = v;
  }
  set z(v) {
    this._z = v;
  }
  set w(v) {
    this._w = v;
  }
  set h(v) {
    this._h = v;
  }
  set d(v) {
    this._d = v;
  }
  set mx(v) {
    this._mx = v;
  }
  set my(v) {
    this._my = v;
  }
  set mz(v) {
    this._mz = v;
  }
  set rx(v) {
    this._rx = v;
  }
  set ry(v) {
    this._ry = v;
  }
  set rz(v) {
    this._rz = v;
  }
}
