import threejs2d from "threejs2d";

let threejs = new threejs2d();

threejs.init("canvas");

let mapWidth = 15;
let mapHeight = 14;
let cellWidth = 50;
let cellHeight = 50;
let map = [];

threejs.fillStyle = "#ffffff";
for (let i = 1; i <= mapWidth; i++) {
  threejs.moveTo(cellWidth * i, 0);
  threejs.lineTo(cellWidth * i, cellHeight * mapHeight);
}
for (let i = 1; i <= mapHeight; i++) {
  threejs.moveTo(0, cellHeight * i);
  threejs.lineTo(cellWidth * mapWidth, cellHeight * i);
}

for (let i = 0; i < mapHeight; i++) {
  var row = new Array(mapWidth);
  row.fill(0);
  map[i] = row;
}

function setAnimation() {}

(function loop() {
  setAnimation();
  threejs.render();
  requestAnimationFrame(loop);
})();
