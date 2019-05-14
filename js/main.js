import { threejs2d } from "threejs2d";
import player from "player";
import settings from "settings";

const threejs = new threejs2d();

threejs.init("canvas");

threejs.fillStyle = "#ffffff";
for (let i = 1; i <= settings.mapWidth; i++) {
  threejs.moveTo(settings.cellWidth * i, 0);
  threejs.lineTo(
    settings.cellWidth * i,
    settings.cellHeight * settings.mapHeight
  );
}
for (let i = 1; i <= settings.mapHeight; i++) {
  threejs.moveTo(0, settings.cellHeight * i);
  threejs.lineTo(
    settings.cellWidth * settings.mapWidth,
    settings.cellHeight * i
  );
}

const p = new player(threejs, 0, 0, 50, 50, 50);

function setAnimation() {
  p.move();
}

(function loop() {
  setAnimation();
  threejs.render();
  requestAnimationFrame(loop);
})();
