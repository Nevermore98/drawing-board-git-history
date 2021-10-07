let canvas = document.getElementById('drawing-board')
let ctx = canvas.getContext('2d')
let colorBtn = document.getElementsByClassName('color-item');

const highlighter = document.getElementById('highlighter');
const eraser = document.getElementById('eraser');
const line = document.getElementById('line');
const rect = document.getElementById('rect');
const circle = document.getElementById('circle');

canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight

ctx.lineWidth = 10
ctx.lineCap = 'round'
ctx.lineJoin = 'round'

let lineColor = 'black'
let lineWidth = 4

let isDrawing = false
let isErasing = false

let lastPoint
// 存储坐标点
let points = [];
let beginPoint = null;

// 创建高清画布
createHDCanvas()
// 设置背景颜色，下载的图片背景才有颜色
setCanvasBg('white');
// 获取线条颜色
selectColor()
// 判断是否为触屏设备
let isTouchDevice = 'ontouchstart' in document.documentElement
if (isTouchDevice) {
  // 触屏设备
  canvas.ontouchstart = (e) => {
    isDrawing = true
    ctx.beginPath()
    beginPoint = {x: e.touches[0].clientX, y: e.touches[0].clientY}
    points.push({x: e.touches[0].clientX, y: e.touches[0].clientY});
    drawCircle(e.clientX, e.clientY, 2) //TODO 指定大小
  }
  canvas.ontouchmove = (e) => {
    if (!isDrawing) return
    ctx.beginPath()
    points.push({x: e.touches[0].clientX, y: e.touches[0].clientY});

    if (points.length > 3) {
      const lastTwoPoints = points.slice(-2);
      const controlPoint = lastTwoPoints[0];
      const endPoint = {
        x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
        y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
      }
      drawSmoothLine(beginPoint, controlPoint, endPoint);
      beginPoint = endPoint;
    }
  }
} else {
  // 非触屏设备
  canvas.onmousedown = (e) => {
    isDrawing = true
    ctx.beginPath()
    beginPoint = {x: e.clientX, y: e.clientY}
    points.push({x: e.clientX, y: e.clientY});
    drawCircle(e.clientX, e.clientY, 2) //TODO 指定大小
  }

  canvas.onmousemove = (e) => {
    if (!isDrawing) return
    ctx.beginPath()
    points.push({x: e.clientX, y: e.clientY});

    if (points.length > 3) {
      const lastTwoPoints = points.slice(-2);
      const controlPoint = lastTwoPoints[0];
      const endPoint = {
        x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
        y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
      }
      drawSmoothLine(beginPoint, controlPoint, endPoint);
      beginPoint = endPoint;
    }
  }

  canvas.onmouseup = (e) => {
    if (!isDrawing) return;
    ctx.beginPath()
    points.push({x: e.clientX, y: e.clientY});

    if (points.length > 3) {
      const lastTwoPoints = points.slice(-2);
      const controlPoint = lastTwoPoints[0];
      const endPoint = lastTwoPoints[1];
      drawSmoothLine(beginPoint, controlPoint, endPoint)
    }
    beginPoint = null;
    drawCircle(e.clientX, e.clientY, 2) //TODO 指定大小
    isDrawing = false;
    points = [];
  }

  canvas.onmouseleave = () => {
    isDrawing = false;
  }
}

// 画圆形
function drawCircle(x, y, radius) {
  ctx.save()
  ctx.beginPath()
  ctx.fillStyle = lineColor
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
  if (isErasing) {
    // ctx.fillStyle = 'white'
    // ctx.strokeStyle = 'white'
    ctx.clip()
    // 存在橡皮擦按下 画黑色圆环的bug
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }
}

// 绘制二次贝塞尔平滑曲线
function drawSmoothLine(beginPoint, controlPoint, endPoint) {
  ctx.lineWidth = lineWidth
  if (isErasing) {
    ctx.save()
    ctx.globalCompositeOperation = "destination-out"
    ctx.moveTo(beginPoint.x, beginPoint.y);
    ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y);
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  } else {
    ctx.beginPath()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.moveTo(beginPoint.x, beginPoint.y);
    ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y);
    ctx.stroke();
    ctx.closePath();
  }
}

function setCanvasBg(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
}

function selectColor() {
  ctx.beginPath()

  for (let i = 0; i < colorBtn.length; i++) {
    colorBtn[i].onclick = function () {
      for (let i = 0; i < colorBtn.length; i++) {
        colorBtn[i].classList.remove('active');
        this.classList.add('active');
        lineColor = this.style.backgroundColor;
        ctx.strokeStyle = lineColor;
      }
    }
  }
  return lineColor
}

eraser.onclick = () => {
  isErasing = true;
  // ctx.strokeStyle = 'white'
};

highlighter.onclick = () => {
  isErasing = false;
};

function createHDCanvas (w=canvas.width,h=canvas.height) {
  let ratio = window.devicePixelRatio || 1;
  canvas.width = w * ratio; // 实际渲染像素
  canvas.height = h * ratio; // 实际渲染像素
  canvas.style.width = `${w}px`; // 控制显示大小
  canvas.style.height = `${h}px`; // 控制显示大小
  ctx.scale(ratio, ratio)
  return canvas;
}

// export {lineWidth }
