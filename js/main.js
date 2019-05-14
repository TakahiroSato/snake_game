import { threejs2d } from "threejs2d";
import gameMgr from "gameMgr";

const threejs = new threejs2d();
threejs.init("canvas");
threejs.fillStyle = "#ffffff";

const game = new gameMgr(threejs);
game.init();

function setAnimation() {
  game.main();
}

(function loop() {
  setAnimation();
  threejs.render();
  requestAnimationFrame(loop);
})();
