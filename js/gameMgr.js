import player from "player";
import settings from "settings";
import childBox from "childBox";
import feed from "feed";

export default class {
  constructor(threejs, canvas2d) {
    this.threejs = threejs;
    this.canvas2d = canvas2d;
    this.player;
    this.childs = [];
    this._feed = null;
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
    this.player = new player(this.threejs, 0, 0, 50, 50, 50);
  }
  main() {
    this.canvas2d.clear();
    this.canvas2d.drawText("SCORE : " + this.childs.length, 0, 0);
    this.player.move();
    this.childs.map(c => {
      c.move();
    });
    this.hitCheck();
    this.feedGen();
  }
  feedGen() {
    if (this.feed === null) {
      const x =
        Math.floor(Math.random() * settings.mapWidth) * settings.cellWidth;
      const y =
        Math.floor(Math.random() * settings.mapHeight) * settings.cellHeight;
      this.feed = new feed(this.threejs, x, y, 50, 50, 50);
    }
  }
  hitCheck() {
    if (this.feed === null) return;
    if (
      this.player.x < this.feed.x + this.feed.w &&
      this.player.x + this.player.w > this.feed.x &&
      this.player.y < this.feed.y + this.feed.h &&
      this.player.y + this.player.h > this.feed.y
    ) {
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
}
