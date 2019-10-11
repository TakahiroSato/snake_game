import player from "player";
import settings from "settings";
import childBox from "childBox";
import feed from "feed";
import keyboard from "keyboard";

export default class {
  constructor(threejs, canvas2d) {
    this.threejs = threejs;
    this.canvas2d = canvas2d;
    this.player;
    this.childs = [];
    this._feed = null;
    this.scene = () => {};

    document.getElementById("2dmode").addEventListener("change", e => {
      if (document.getElementById("2dmode").checked) {
        this.threejs.changeCamera2d();
      } else {
        this.threejs.changeCamera3d();
      }
    });
  }
  reset() {
    this.canvas2d.clear();
    this.player = null;
    this.childs = [];
    this.feed = null;
    this.threejs.clear();
    this.init();
  }
  get feed() {
    return this._feed;
  }
  set feed(v) {
    if (this._feed) {
      this._feed.death();
    }
    this._feed = v;
  }
  init() {
    this.threejs.fillStyle = "#ffffff";
    for (let i = 0; i <= settings.mapWidth; i++) {
      this.threejs.moveTo(settings.cellWidth * i, 0);
      this.threejs.lineTo(
        settings.cellWidth * i,
        settings.cellHeight * settings.mapHeight
      );
    }
    for (let i = 0; i <= settings.mapHeight; i++) {
      this.threejs.moveTo(0, settings.cellHeight * i);
      this.threejs.lineTo(
        settings.cellWidth * settings.mapWidth,
        settings.cellHeight * i
      );
    }
    this.player = new player(
      this.threejs,
      0,
      0,
      settings.cellWidth,
      settings.cellHeight,
      50
    );
    this.player.mx = settings.moveSpeed;
    keyboard.esc = () => {
      this.reset();
    };
    keyboard.p = () => {
      this.scene = this.pose;
    };
    this.scene = this.main;
  }
  main() {
    this.canvas2d.clear();
    this.canvas2d.drawText(
      "SCORE : " + this.childs.length,
      0,
      0,
      "#ffffff",
      30
    );

    this.player.move();
    this.childs.map(c => {
      c.move();
    });
    this.hitCheck();
    this.feedGen();
  }
  pose() {
    this.canvas2d.drawText("P O S E", 450, 300, "#ffffff", 50);
    keyboard.p = () => {
      this.scene = this.main;
      keyboard.p = () => {
        this.scene = this.pose;
      };
    };
  }
  gameOver() {
    this.canvas2d.drawText("GAME OVER", 375, 300, "#ffffff", 60);
    keyboard.p = () => {
      this.reset();
    };
  }
  feedGen() {
    if (this.childs.length + 1 >= settings.mapWidth * settings.mapHeight)
      return;
    if (this.feed === null) {
      let x,
        y = 0;
      while (true) {
        x = Math.floor(Math.random() * settings.mapWidth) * settings.cellWidth;
        y =
          Math.floor(Math.random() * settings.mapHeight) * settings.cellHeight;
        if (
          !this.childs.some(child => {
            if (
              child.x < x + settings.cellWidth &&
              child.x + child.w > x &&
              child.y < y + settings.cellHeight &&
              child.y + child.h > y
            ) {
              return true;
            }
            return false;
          })
        ) {
          break;
        }
      }
      this.feed = new feed(
        this.threejs,
        x,
        y,
        settings.cellWidth,
        settings.cellHeight,
        50
      );
    }
  }
  hitCheck() {
    if (this.feed) {
      if (this.player.detectCollision(this.feed)) {
        if (this.childs.length === 0) {
          this.childs.push(new childBox(this.threejs, "#ff0000", this.player));
        } else {
          this.childs.push(
            new childBox(
              this.threejs,
              "#ff0000",
              this.childs[this.childs.length - 1]
            )
          );
        }
        this.feed = null;
      }
    }
    if (this.player.mx === 0 && this.player.my === 0) {
      this.scene = this.gameOver;
      return;
    }
    for (let i = 2; i < this.childs.length; i++) {
      if (this.player.detectCollision(this.childs[i])) {
        this.scene = this.gameOver;
        break;
      }
    }
  }
}
