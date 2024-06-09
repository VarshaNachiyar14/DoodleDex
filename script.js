class PaintApp {
  constructor(canvasId, increaseBtnId, decreaseBtnId, sizeElementId, colorElementId, clearElementId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.increaseButton = document.getElementById(increaseBtnId);
    this.decreaseButton = document.getElementById(decreaseBtnId);
    this.sizeElement = document.getElementById(sizeElementId);
    this.colorElement = document.getElementById(colorElementId);
    this.clearElement = document.getElementById(clearElementId);
    this.size = 10;
    this.color = "black";
    this.x;
    this.y;
    this.isPressed = false;

    this.init();
  }

  init() {
    this.updateSizeOnScreen();
    this.addEventListeners();
  }

  drawCircle(x, y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  drawLine(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.size * 2;
    this.ctx.stroke();
  }

  updateSizeOnScreen() {
    this.sizeElement.innerText = this.size;
  }

  addEventListeners() {
    this.canvas.addEventListener("mousedown", (e) => {
      this.isPressed = true;
      this.x = e.offsetX;
      this.y = e.offsetY;
    });

    this.canvas.addEventListener("mouseup", () => {
      this.isPressed = false;
      this.x = undefined;
      this.y = undefined;
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (this.isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        this.drawCircle(x2, y2);
        this.drawLine(this.x, this.y, x2, y2);
        this.x = x2;
        this.y = y2;
      }
    });

    this.increaseButton.addEventListener("click", () => {
      this.size += 5;
      if (this.size > 50) this.size = 50;
      this.updateSizeOnScreen();
    });

    this.decreaseButton.addEventListener("click", () => {
      this.size -= 5;
      if (this.size < 5) this.size = 5;
      this.updateSizeOnScreen();
    });

    this.colorElement.addEventListener("change", (e) => {
      this.color = e.target.value;
    });

    this.clearElement.addEventListener("click", () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    });
  }
}

const paintApp = new PaintApp("canvas", "increase", "decrease", "size", "color", "clear");
