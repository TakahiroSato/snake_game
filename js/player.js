import box from "box";
import keyboard from "keyboard";
import settings from "settings";

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
  }
  changeDirection() {
    if (this.nextmx !== 0 || this.nextmy !== 0) {
      if (
        this.x % settings.cellWidth === 0 &&
        this.y % settings.cellHeight === 0
      ) {
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
  }
}
