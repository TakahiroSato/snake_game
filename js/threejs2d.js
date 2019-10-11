import * as THREE from "three";

export class threejsObject {
  constructor(parent) {
    this.threejs2d = parent;
    this.mesh = null;
    this.geometry = null;
    this.material = null;
    this.texture = null;
  }
  setPos(x, y, z) {
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
  }
  setRotation(x, y, z) {
    this.mesh.rotation.x = x;
    this.mesh.rotation.y = y;
    this.mesh.rotation.z = z;
  }
  remove() {
    if (this.threejs2d.objectsArray.indexOf(this) != -1) {
      this.threejs2d.objectsArray.splice(
        this.threejs2d.objectsArray.indexOf(this),
        1
      );
    }
    if (this.mesh !== null) this.threejs2d.scene.remove(this.mesh);
    if (this.geometry !== null) this.geometry.dispose();
    if (this.material !== null) this.material.dispose();
    if (this.texture !== null) this.texture.dispose();

    this.mesh = null;
    this.geometry = null;
    this.material = null;
    this.texture = null;
  }
  isEmpty() {
    return this.mesh === null ? true : false;
  }
}

export class threejsBoxObject extends threejsObject {
  constructor(parent) {
    super(parent);
    this.w = null;
    this.h = null;
    this.d = null;
  }
  setPos(x, y, z) {
    this.mesh.position.x = x - (this.threejs2d.width - this.w) / 2;
    this.mesh.position.y = -y + (this.threejs2d.height - this.h) / 2;
    this.mesh.position.z = z + this.d / 2;
  }
}

export class threejs2d {
  constructor() {
    this.renderer;
    this.scene;
    this.camera;
    this.div;
    this.width;
    this.height;
    this.fov = 90; // 画角
    this.near = 0.1; // 視体積手前までの距離
    this.far = 1500; // 視体積奥までの距離
    this.sx;
    this.sy;
    this.backGroundColor = "#000000";
    this.objectsArray = [];
    this.fillStyle = 0;
    this.lineWidth = 1;
    this.globalAlpha = 1;
  }
  init(divid) {
    this.div = document.getElementById(divid);
    this.width = this.div.clientWidth;
    this.height = this.div.clientHeight;
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true }); // レンダラーの生成
    this.renderer.setSize(this.width, this.height); // レンダラーのサイズをdivのサイズに設定
    this.renderer.setClearColor(this.backGroundColor, 1); // レンダラーの背景色を黒色（透過）に設定
    this.div.appendChild(this.renderer.domElement); // div領域にレンダラーを配置
    this.scene = new THREE.Scene(); // シーンの生成
    // 座標軸を表示
    //let axes = new THREE.AxesHelper(this.width);
    //this.scene.add(axes);
    let directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 0.7, 0.7);
    this.scene.add(directionalLight);
    this.changeCamera3d();
    // 環境光源
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  }
  changeCamera3d() {
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.width / this.height,
      this.near,
      this.far
    );
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(-450, -350, 525);
    this.camera.lookAt(new THREE.Vector3(-120, 250, -950));
  }
  changeCamera2d() {
    this.camera = new THREE.OrthographicCamera(
      this.width / -2,
      this.width / 2,
      this.height / 2,
      this.height / -2,
      this.near,
      this.far
    );
    this.camera.position.set(-250, 0, this.height / 2);
    this.camera.lookAt(new THREE.Vector3(-250, 0, 0));
  }
  setCameraPosition(x, y, z) {
    this.camera.position.set(-x, y, this.height / 2 + z);
  }
  setCameraLookAt(x, y, z) {
    this.camera.lookAt(new THREE.Vector3(x, y, z));
  }
  moveTo(x, y) {
    this.sx = x;
    this.sy = y;
  }
  lineTo(x, y) {
    this.drawLine(this.sx, this.sy, x, y, this.lineWidth, this.fillStyle);
    this.sx = x;
    this.sy = y;
  }
  drawLine(sx, sy, dx, dy, w, color) {
    dy *= -1;
    sy *= -1;
    let obj = new threejsObject(this);
    // geometryの宣言と生成
    obj.geometry = new THREE.Geometry();
    // 頂点座標の追加
    obj.geometry.vertices.push(
      new THREE.Vector3(sx - this.width / 2, sy + this.height / 2, 0)
    );
    obj.geometry.vertices.push(
      new THREE.Vector3(dx - this.width / 2, dy + this.height / 2, 0)
    );
    // 線オブジェクトの生成
    obj.material = new THREE.LineBasicMaterial({
      linewidth: w,
      color: color
    });
    obj.mesh = new THREE.Line(obj.geometry, obj.material);
    this.objectsArray.push(obj);
    // sceneにlineを追加
    this.scene.add(obj.mesh);
  }
  fillRect(x, y, w, h) {
    return this.drawRect(x, y, w, h, this.fillStyle);
  }
  drawRect(x, y, w, h, color) {
    y *= -1;
    let obj = new threejsObject(this);
    obj.geometry = new THREE.PlaneGeometry(w, h);
    obj.material = new THREE.MeshBasicMaterial({ color: color });
    obj.material.transparent = true;
    obj.material.opacity = this.globalAlpha;
    obj.mesh = new THREE.Mesh(obj.geometry, obj.material);
    obj.mesh.position.x = x - (this.width - w) / 2;
    obj.mesh.position.y = y + (this.height - h) / 2;
    obj.mesh.position.z = 0;
    this.objectsArray.push(obj);
    this.scene.add(obj.mesh);
    return obj;
  }
  drawBox(x, y, w, h, d, color) {
    let obj = new threejsBoxObject(this);
    obj.geometry = new THREE.BoxGeometry(w, h, d);
    obj.material = new THREE.MeshLambertMaterial({ color: color });
    obj.material.transparent = true;
    obj.material.opacity = this.globalAlpha;
    obj.mesh = new THREE.Mesh(obj.geometry, obj.material);
    obj.w = w;
    obj.h = h;
    obj.d = d;
    this.scene.add(obj.mesh);
    obj.setPos(x, y, 0);
    this.objectsArray.push(obj);
    return obj;
  }
  drawText(
    text,
    x,
    y,
    color = "#ffffff",
    size = 18,
    font = "'ＭＳ　Ｐゴシック'"
  ) {
    const obj = new threejsObject(this);
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    ctx.font = size + "pt " + font;
    ctx.fillStyle = color;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(text, 0, 0);
    document.body.appendChild(canvas);
    obj.texture = new THREE.Texture(canvas);
    obj.texture.needsUpdate = true;
    obj.material = new THREE.SpriteMaterial({
      map: obj.texture
    });
    obj.mesh = new THREE.Sprite(obj.material);
    obj.mesh.scale.set(200, 200, 200);
    obj.mesh.position.set(x, y, 0);
    this.scene.add(obj.mesh);
    this.objectsArray.push(obj);
    return obj;
  }
  clear() {
    while (this.objectsArray.length > 0) {
      this.objectsArray[0].remove();
    }
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
