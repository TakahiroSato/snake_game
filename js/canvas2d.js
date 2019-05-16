class canvas2d {
  constructor() {
    this.canvas;
    this.ctx;
  }
  init(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
  }
  drawText(
    text,
    x,
    y,
    color = "#ffffff",
    size = 10,
    font = "'ＭＳ　Ｐゴシック'"
  ) {
    this.ctx.font = size + "pt " + font;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";
    this.ctx.fillText(text, x, y);
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
  }
}

export default new canvas2d();
