import { threejs2d } from "threejs2d";
import gameMgr from "gameMgr";
import canvas2d from "canvas2d";

const threejs = new threejs2d();
threejs.init("canvas3d");
canvas2d.init("canvas2d");

const game = new gameMgr(threejs, canvas2d);
game.init();

function setAnimation() {
  game.main();
}

(function loop() {
  setAnimation();
  threejs.render();
  requestAnimationFrame(loop);
})();
