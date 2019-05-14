import box from "box";
import keyboard from "keyboard";
import settings from "settings";
import childBox from "childBox";

const playerColor = "#ff0000";

export default class player extends box {
  constructor(threejs, x, y, w, h, d) {
    super(threejs, x, y, w, h, d, playerColor);
    this.nextmx = 0;
    this.nextmy = 0;
    keyboard.left = () => {
      if (this.mx === 0) {
        this.nextmx = -settings.moveSpeed;
        this.nextmy = 0;
      }
    };
    keyboard.up = () => {
      if (this.my === 0) {
        this.nextmx = 0;
        this.nextmy = -settings.moveSpeed;
      }
    };
    keyboard.right = () => {
      if (this.mx === 0) {
        this.nextmx = settings.moveSpeed;
        this.nextmy = 0;
      }
    };
    keyboard.down = () => {
      if (this.my === 0) {
        this.nextmx = 0;
        this.nextmy = settings.moveSpeed;
      }
    };
    this._dummy = null;
    this.dummyCnt = 0;
    this.hasChild = false;
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
  changeDirection() {
    if (this.nextmx !== 0 || this.nextmy !== 0) {
      if (
        this.x % settings.cellWidth === 0 &&
        this.y % settings.cellHeight === 0
      ) {
        if (this.hasChild)
          this.dummy = new childBox(this.threejs, this.color, this);
        this.mx = this.nextmx;
        this.my = this.nextmy;
        this.nextmx = 0;
        this.nextmy = 0;
      }
    }
  }
  move() {
    this.changeDirection();
    this.x += this.mx;
    this.y += this.my;
    if (this.x < 0) {
      this.x = 0;
      this.mx = 0;
    }
    if (this.x + this.w > settings.fieldWidth) {
      this.x = settings.fieldWidth - this.w;
      this.mx = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.my = 0;
    }
    if (this.y + this.h > settings.fieldHeight) {
      this.y = settings.fieldHeight - this.h;
      this.my = 0;
    }
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
