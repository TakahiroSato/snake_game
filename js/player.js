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
        this.nextmx = -5;
        this.nextmy = 0;
      }
    };
    keyboard.up = () => {
      if (this.my === 0) {
        this.nextmx = 0;
        this.nextmy = -5;
      }
    };
    keyboard.right = () => {
      if (this.mx === 0) {
        this.nextmx = 5;
        this.nextmy = 0;
      }
    };
    keyboard.down = () => {
      if (this.my === 0) {
        this.nextmx = 0;
        this.nextmy = 5;
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
    if (this.x < 0) this.x = 0;
    if (this.x + this.w > settings.fieldWidth) {
      this.x = settings.fieldWidth - this.w;
    }
    if (this.y < 0) this.y = 0;
    if (this.y + this.h > settings.fieldHeight) {
      this.y = settings.fieldHeight - this.h;
    }
  }
}
