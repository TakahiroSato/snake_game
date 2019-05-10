import * as THREE from "three";

export default class threejs2d {
  constructor() {
    this.renderer;
    this.scene;
    this.camera;
    this.div;
    this.width;
    this.height;
    this.fov = 45; // 画角
    this.near = 0.1; // 視体積手前までの距離
    this.far = 1000; // 視体積奥までの距離
    this.sx;
    this.sy;
    this.backGroundColor = "#000000";
    this.objectsArray = [];
    this.fillStyle = 0;
    this.lineWidth = 1;
    this.globalAlpha = 1;
  }
  createEmptyObject() {
    let self = this;
    return {
      mesh: null,
      geometry: null,
      material: null,
      texture: null,
      setPos: function(x, y, z) {
        this.mesh.setPos(
          x,
          y,
          z,
          this.geometry.parameters.width,
          this.geometry.parameters.height
        );
      },
      setRotation: function(x, y, z) {
        this.mesh.setRotation(x, y, z);
      },
      remove: function() {
        if (self.objectsArray.indexOf(this) != -1) {
          self.objectsArray.splice(self.objectsArray.indexOf(this), 1);
        }
        if (this.mesh !== null) scene.remove(this.mesh);
        if (this.geometry !== null) this.geometry.dispose();
        if (this.material !== null) this.material.dispose();
        if (this.texture !== null) this.texture.dispose();

        this.mesh = null;
        this.geometry = null;
        this.material = null;
        this.texture = null;
      },
      isEmpty: function() {
        return this.mesh === null ? true : false;
      }
    };
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
    let axes = new THREE.AxesHelper(this.width);
    this.scene.add(axes);
    let directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 0.7, 0.7);
    this.scene.add(directionalLight);
    //camera = new THREE.PerspectiveCamera(fov, width/height, near, far);
    this.camera = new THREE.OrthographicCamera(
      this.width / -2,
      this.width / 2,
      this.height / 2,
      this.height / -2,
      this.near,
      this.far
    );
    this.camera.up.set(0, 1, 0);
    this.camera.position.set(0, 0, this.height / 2);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }
  setCameraPosition(x, y, z) {
    camera.position.set(-x, y, height / 2 + z);
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
    let obj = this.createEmptyObject();
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
    let obj = this.createEmptyObject();
    obj.geometry = new THREE.PlaneGeometry(w, h);
    obj.material = new THREE.MeshBasicMaterial({ color: color });
    obj.material.transparent = true;
    obj.material.opacity = this.globalAlpha;
    obj.mesh = new THREE.Mesh(obj.geometry, obj.material);
    obj.mesh.position.x = x - (width - w) / 2;
    obj.mesh.position.y = y + (height - h) / 2;
    obj.mesh.position.z = 0;
    this.objectsArray.push(obj);
    scene.add(obj.mesh);
    return obj;
  }
  drawBox(x, y, w, h, d, color) {
    y *= -1;
    var obj = this.createEmptyObject();
    obj.geometry = new THREE.BoxGeometry(w, h, d);
    obj.material = new THREE.MeshLambertMaterial({ color: color });
    obj.material.transparent = true;
    obj.material.opacity = this.globalAlpha;
    obj.mesh = new THREE.Mesh(obj.geometry, obj.material);
    scene.add(obj.mesh);
    obj.mesh.setPos = function(x, y, z, w, h) {
      this.position.x = x - (width - w) / 2;
      this.position.y = -y + (height - h) / 2;
      this.position.z = z;
    };
    obj.mesh.setRotation = function(x, y, z) {
      this.rotation.x = x;
      this.rotation.y = y;
      this.rotation.z = z;
    };
    obj.mesh.setPos(x, y, 0);
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
